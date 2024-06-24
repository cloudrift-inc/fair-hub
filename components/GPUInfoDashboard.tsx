import React, {useState, useEffect} from "react";
import GpuCard from "./GpuCard";
import {useMutation} from "@tanstack/react-query";
import {getFairProviderPubApiKey, getFairApiUrl} from "@/lib/faircompute";

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
}

interface ListNodesResponse {
    nodes: string[];
}

interface GPUInfoDashboardProps {
    currentPage: string;
}

const fetchNodeIds = async (): Promise<ListNodesResponse> => {
    const apiUrl = getFairApiUrl();
    const response = await fetch(`${apiUrl}/api/v1/nodes/list`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": getFairProviderPubApiKey(),
            "Authorization": "Bearer " + localStorage.getItem("token")

        },
    });

    if (!response.ok) {
        throw new Error("Error fetching node IDs: " + response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data["data"];
};

const fetchNodeInfo = async (nodeId: string): Promise<NodeInfoResponse> => {
    const apiUrl = getFairApiUrl();
    const response = await fetch(`${apiUrl}/api/v1/nodes/${nodeId}/info`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": getFairProviderPubApiKey(),
            "Authorization": "Bearer " + localStorage.getItem("token")

        },
    });

    if (!response.ok) {
        console.log(response.statusText)
        throw new Error("Error fetching node info: " + response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data["data"];
};

const GPUInfoDashboard: React.FC<GPUInfoDashboardProps> = ({ currentPage }) => {
    const [nodeInfoList, setNodeInfoList] = useState<(NodeInfoResponse & { nodeId: string })[]>([]);
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation<ListNodesResponse, Error>({
        mutationFn: async () => {
            return fetchNodeIds();
        },
        onSuccess: async (data) => {
            const nodeInfoPromises = data.nodes.map((nodeId) => fetchNodeInfo(nodeId));
            try {
                const nodeInfoResponses = await Promise.all(nodeInfoPromises);
                setNodeInfoList(
                    nodeInfoResponses.map((nodeInfo, index) => ({
                        ...nodeInfo,
                        instance: nodeInfo.instance || {
                            provider: "Unknown",
                            instance_type: "Unknown",
                            cost_per_hour: 1000,
                        },
                        nodeId: data.nodes[index],
                        dram: Math.floor(nodeInfo.dram / (1024 * 1024 * 1024)),
                    }))
                );
                setError(null);
            } catch (error) {
                setError("Error fetching node info: " + (error as Error).message);
            }
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
            style={{rowGap: "28px", columnGap: "22px"}}
        >
            {nodeInfoList.map((nodeInfo, index) => (
                <GpuCard
                    key={index}
                    title={nodeInfo.gpus.length > 0 ? nodeInfo.gpus[0].brand : "None"}
                    gpuQuantity={nodeInfo.gpus_available}
                    cpuCores={nodeInfo.cpu.available_core_count}
                    ram={`${nodeInfo.dram} GB`}
                    price={`$${nodeInfo.instance?.cost_per_hour || nodeInfo.gpus_available}/hr`}
                    nodeId={nodeInfo.nodeId}
                    currentPage={currentPage}
                />
                
            ))}
            {mutation.isError && <div>{error}</div>}
        </div>
    );
};

export default GPUInfoDashboard;