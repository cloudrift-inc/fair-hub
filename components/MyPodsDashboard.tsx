import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
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

const getApiUrl = (): string => {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_PROD_API_URL || "";
  } else {
    return process.env.REACT_APP_LOCAL_API_URL || "";
  }
};

const fetchExecutorIds = async (): Promise<ListExecutorsResponse> => {
  const apiUrl = getApiUrl();
  console.log(apiUrl)
  const response = await fetch(`${apiUrl}/api/v1/executors/list`, {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "debug_api_key",
      "Authorization": "Bearer " + localStorage.getItem("token")
},
  });

  if (!response.ok) {
    console.log(response.statusText)
    throw new Error("Error fetching executor IDs: " + response.statusText);
  }

  const data = await response.json();
  console.log(data);
  return data["data"];
};

const fetchExecutorInfo = async (executorId: string): Promise<ExecutorInfoResponse> => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/v1/executors/${executorId}/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "debug_api_key",
      "Authorization": "Bearer " + localStorage.getItem("token")
},
  });

  if (!response.ok) {
    console.log(response.statusText)
    throw new Error("Error fetching executor info: " + response.statusText);
  }

  const data = await response.json();
  console.log(data);
  return data["data"];
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
          gpuQuantity={executorInfo.gpu_mask.split("").filter((bit) => bit === "1").length}
          cpuCores={executorInfo.cpu_mask.split("").filter((bit) => bit === "1").length}
          storage={`${executorInfo.disk}TB+`}
          ram={`${Math.floor(executorInfo.dram / (1024*1024*1024))} GB`}
          status={executorInfo.status}
        />
      ))}
      {mutation.isError && <div>{error}</div>}
    </div>
  );
};

export default MyPodsDashboard;