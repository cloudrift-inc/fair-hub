import React from "react";
import GpuCard from "./GpuCard";
import useNodeInfo from "./GPUInfoFetch";

interface GPUInfoDashboardProps {
    currentPage: string;
}

const GPUInfoDashboard: React.FC<GPUInfoDashboardProps> = ({ currentPage }) => {
    const { nodeInfoList, error, loading } = useNodeInfo();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
        </div>
    );
};

export default GPUInfoDashboard;
