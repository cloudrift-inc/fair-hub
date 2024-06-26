import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {getFairProviderPubApiKey, getFairApiUrl} from "@/lib/faircompute";
import MyPodsCard from './MyPodsCard';

interface ExecutorInfoResponse {
  node_id: string;
  cpu_mask: string;
  gpu_mask: string;
  dram: number;
  disk: number;
  status: string;
  resource_info?: ExecutorResourceInfo;
  usage_info?: ExecutorUsageInfo;
  executor_id: string;
}

interface ExecutorResourceInfo {
  provider_name: string;
  instance_type_name: string;
  cost_per_hour: number;
}

interface ExecutorUsageInfo {
  usage: string;
  accounted_usage: string;
}

interface ListExecutorsResponse {
  executors: string[];
}

const fetchExecutorIds = async (): Promise<ListExecutorsResponse> => {
  const apiUrl = getFairApiUrl();
  console.log(apiUrl)
  const response = await fetch(`${apiUrl}/api/v1/executors/list`, {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getFairProviderPubApiKey(),
      "Authorization": "Bearer " + localStorage.getItem("token")
},
  });

  if (!response.ok) {
    throw new Error("Error fetching executor IDs: " + response.statusText);
  }

  const data = await response.json();
  return data["data"];
};

const fetchExecutorInfo = async (executorId: string): Promise<ExecutorInfoResponse> => {
  const apiUrl = getFairApiUrl();
  const response = await fetch(`${apiUrl}/api/v1/executors/${executorId}/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "debug_api_key",
      "Authorization": "Bearer " + localStorage.getItem("token")
},
  });

  if (!response.ok) {
    throw new Error("Error fetching executor info: " + response.statusText);
  }

  const data = await response.json();
  return { ...data, executor_id: executorId };
};

const MyPodsDashboard: React.FC = () => {
  const [executorInfoList, setExecutorInfoList] = useState<ExecutorInfoResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation<ListExecutorsResponse, Error>({
    mutationFn: async () => {
      return fetchExecutorIds();
    },
    onSuccess: async (data) => {
      const executorInfoPromises = data.executors.map((executorId) => fetchExecutorInfo(executorId));
      try {
        const executorInfoResponses = await Promise.all(executorInfoPromises);
        setExecutorInfoList(executorInfoResponses);
        setError(null);
      } catch (error) {
        setError("Error fetching executor info: " + (error as Error).message);
      }
    },
    onError: (error: Error) => {
      setError("Error fetching executor IDs: " + error.message);
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
      {executorInfoList.map((executorInfo, index) => (
        <MyPodsCard
          key={index}
          title={`NVIDIA GeForce RTX 4090`}
          gpuQuantity={executorInfo.gpu_mask ? executorInfo.gpu_mask.split("").filter((bit) => bit === "1").length : 0}
          cpuCores={executorInfo.cpu_mask ? executorInfo.cpu_mask.split("").filter((bit) => bit === "1").length : 0}
          ram={`${Math.floor(executorInfo.dram / (1024*1024*1024))} GB`}
          status={executorInfo.status}
          executorId={executorInfo.executor_id}
        />
      ))}
      {mutation.isError && <div>{error}</div>}
    </div>
  );
};

export default MyPodsDashboard;