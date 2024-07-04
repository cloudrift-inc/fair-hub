import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import MyPodsCard from './MyPodsCard';
import {FAIR_API_VERSION, getFairApiUrl} from "@/lib/faircompute";

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

const fetchExecutors = async (): Promise<ListExecutorsResponse> => {
  const apiUrl = getFairApiUrl();
  const response = await fetch(`${apiUrl}/api/v1/executors/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
        },
    body: JSON.stringify({
      "version": FAIR_API_VERSION,
      "data": { all: false },
    })
  });

  if (!response.ok) {
    throw new Error("Error fetching executors: " + response.statusText);
  }

  const data = await response.json();
  return data['data'];
};

const MyPodsDashboard: React.FC = () => {
  const [executorInfoList, setExecutorInfoList] = useState<ExecutorAndUsageInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation<ListExecutorsResponse, Error>({
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
    mutation.mutate();
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
            title={`NVIDIA GeForce RTX 4090`}
            gpuQuantity={countBits(executorInfo.gpu_mask)}
            cpuCores={countBits(executorInfo.cpu_mask)}
            ram={`${Math.floor(executorInfo.dram / (1024 * 1024 * 1024))} GB`}
            status={executorInfo.status}
            executorId={executorInfo.id}
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
