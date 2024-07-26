import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import MyPodsCard from './MyPodsCard';
import { apiRequest } from "@/lib/faircompute";
import useNodeInfo from "./GPUInfoFetch";

interface ExecutorResourceInfo {
  provider_name: string;
  instance_type_name: string;
  cost_per_hour: number;
}

interface ExecutorUsageInfo {
  usage: string;
  accounted_usage: string;
}

interface ExecutorAndUsageInfo {
  id: string;
  node_id: string;
  cpu_mask: string;
  gpu_mask: string;
  dram: number;
  disk: number;
  status: string;
  resource_info?: ExecutorResourceInfo;
  usage_info?: ExecutorUsageInfo;
  host_address:string;
}

interface ListExecutorsResponse {
  executors: ExecutorAndUsageInfo[];
}

function countBits(hexString: string): number {
  // Remove any leading "0x" if present
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  }

  // Convert hex string to a binary string
  let binaryString = '';
  for (let char of hexString) {
    // Convert each hex character to a 4-bit binary string
    const binaryChar = parseInt(char, 16).toString(2).padStart(4, '0');
    binaryString += binaryChar;
  }

  // Count the number of '1' bits in the binary string
  let bitCount = 0;
  for (let bit of binaryString) {
    if (bit === '1') {
      bitCount++;
    }
  }

  return bitCount;
}

export const fetchExecutors = async (token: string): Promise<ListExecutorsResponse> => {
  const requestData = {all: false };

  const response = await apiRequest<{ data: ListExecutorsResponse }>("/api/v1/executors/list", true,  requestData);

  return response.data;
};

const MyPodsDashboard: React.FC = () => {
  const [executorInfoList, setExecutorInfoList] = useState<ExecutorAndUsageInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { nodeInfoList, error: nodeInfoError, loading: nodeInfoLoading } = useNodeInfo();

  const getTitle = (nodeId: string) => {
    const node = nodeInfoList.find(node => node.id === nodeId);
    return node && node.gpus.length > 0 ? node.gpus[0].brand : "None";
  };

  const mutation = useMutation<ListExecutorsResponse, Error, string>({
    mutationFn: fetchExecutors,
    onSuccess: (data) => {
      setExecutorInfoList(data.executors || []);
      setError(null);
    },
    onError: (error: Error) => {
      setError("Error fetching executors: " + error.message);
    },
  });


    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        if (token) {
            mutation.mutate(token);
        } else {
            console.error("No auth token found");
            setError("Please Log In to access this page.");
        }
    }, []);
  return (
    <div
      className="flex flex-wrap items-start justify-start p-4"
      style={{ rowGap: "28px", columnGap: "22px" }}
    >
      {executorInfoList.length > 0 ? (
        executorInfoList.map((executorInfo, index) => (
          <MyPodsCard
            key={index}
            title={getTitle(executorInfo.node_id)}
            gpuQuantity={countBits(executorInfo.gpu_mask)}
            cpuCores={countBits(executorInfo.cpu_mask)}
            ram={`${Math.floor(executorInfo.dram / (1024 * 1024 * 1024))} GB`}
            status={executorInfo.status}
            executorId={executorInfo.id}
            host_address={executorInfo.host_address}
          />
        ))
      ) : (
        <div>No executors found.</div>
      )}
      {mutation.isError && <div>{error}</div>}
    </div>
  );
};

export default MyPodsDashboard;
