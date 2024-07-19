import { useState, useEffect } from "react";
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

const fetchNodeIds = async (): Promise<ListNodesResponse> => {
    const requestData = {}; // If there is any specific request data, add here.

    const response = await apiRequest<{ data: ListNodesResponse }>("/api/v1/marketplace/providers/nodes/list", true, requestData);

    return response.data;
};

const useNodeInfo = () => {
    const [nodeInfoList, setNodeInfoList] = useState<NodeInfoResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
            setLoading(false);
        },
        onError: (error: Error) => {
            setError("Error fetching node IDs: " + error.message);
            setLoading(false);
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    return { nodeInfoList, error, loading };
};

export default useNodeInfo;