import React, { useState, useEffect } from "react";
import GpuCard from "./GpuCard";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/faircompute";

interface NodeInfoResponse {
    instance?: {
        provider: string;
        instance_type: string;
        cost_per_hour: number;
    };

    cpu: {
        vendor: string;
        brand: string;
        physical_core_count: number;
        available_core_count: number;
        available_core_mask: string;
    };
    gpus: {
        vendor: string;
        brand: string;
    }[];
    gpus_available: number;
    gpus_mask: string;
    dram: number;
    disk: number;
    id: string;
}

interface ListNodesResponse {
    nodes: NodeInfoResponse[];
}

interface GPUInfoDashboardProps {
    currentPage: string;
}

const fetchNodeIds = async (): Promise<ListNodesResponse> => {
    const requestData = {}; // If there is any specific request data, add here.

    const response = await apiRequest<{ data: ListNodesResponse }>("/api/v1/marketplace/providers/nodes/list", "POST",true, true, requestData);

    if (!response || !response.data || !response.data.nodes) {
        throw new Error("Invalid response structure: " + JSON.stringify(response));
    }

    console.log(response)
    return response.data;
};

const GPUInfoDashboard: React.FC<GPUInfoDashboardProps> = ({ currentPage }) => {
    const [nodeInfoList, setNodeInfoList] = useState<NodeInfoResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation<ListNodesResponse, Error>({
        mutationFn: async () => {
            return fetchNodeIds();
        },
        onSuccess: (data) => {
            setNodeInfoList(
                data.nodes
                    .map((nodeInfo) => ({
                        ...nodeInfo,
                        dram: Math.floor(nodeInfo.dram / (1024 * 1024 * 1024)),
                    }))
                    .filter(nodeInfo => nodeInfo.cpu.available_core_count > 0)
            );
            setError(null);
        },
        onError: (error: Error) => {
            setError("Error fetching node IDs: " + error.message);
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    return (
        <div
            className="flex flex-wrap items-start justify-start p-4"
            style={{ rowGap: "28px", columnGap: "22px" }}
        >
            {nodeInfoList.length > 0 ? (
                nodeInfoList.map((nodeInfo, index) => (
                    <GpuCard
                        key={index}
                        title={nodeInfo.gpus.length > 0 ? nodeInfo.gpus[0].brand : "None"}
                        gpuQuantity={nodeInfo.gpus_available}
                        cpuCores={nodeInfo.cpu.available_core_count}
                        totalCpus={nodeInfo.cpu.physical_core_count}
                        price={`\$${(nodeInfo.instance?.cost_per_hour || 0.0) / 100}/hr`}
                        ram={nodeInfo.dram}
                        totalRam={nodeInfo.dram}
                        nodeId={nodeInfo.id}
                        currentPage={currentPage}
                        totalgpus={nodeInfo.gpus.length}
                    />
                ))
            ) : (
                <div>No nodes available with GPUs and CPU cores.</div>
            )}
            {mutation.isError && <div>{error}</div>}
        </div>
    );
};

export default GPUInfoDashboard;
