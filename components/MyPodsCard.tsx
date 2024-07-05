import React, { useState } from 'react';
import '../app/console.css';
import MyPodPanel from '../components/MyPodPanel';
import {useMutation} from "@tanstack/react-query";
import StopIcon from '@mui/icons-material/Stop';
import {getFairApiUrl, getFairProviderPubApiKey} from "@/lib/faircompute";

interface MyPodsCardProps {
  title: string;
  gpuQuantity: number;
  cpuCores: number;
  ram: string;
  status:string;
  executorId: string;
}

const stopExecutor = async (executorId: string): Promise<void> => {
  const apiUrl = getFairApiUrl();
  const response = await fetch(`${apiUrl}/api/v1/executors/${executorId}/stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getFairProviderPubApiKey(),
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

const MyPodsCard: React.FC<MyPodsCardProps> = ({
  title,
  gpuQuantity,
  cpuCores,
  ram,
  status,
  executorId
}) => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShowInstructions = () => {
    setPanelOpen(true);
  };

  const handlePanelClose = () => {
    setPanelOpen(false);
  };

  const mutation = useMutation<void, Error, string>({
    mutationFn: stopExecutor,
    onSuccess: (data) => {
      console.log("Delete successful:", data);
      // Store token in localStorage or sessionStorage
      // Update user context with logged-in user data if needed   
       },
      onError: (error) => {
        setError(error.message);
        console.error("Error logging in:", error);
      },
  });

  const handleStopExecutor = async () => {
    mutation.mutate(executorId);
  };

  return (
    <>
      <div
        className="w-4/5 h-2/3 md:w-[363px] md:h-[285px] relative bg-[#292929] rounded-xl p-4 text-white transition duration-300 ease-in-out "
      >
        <div className="flex flex-col justify-between h-full">
        <div className="relative flex items-center mb-3">
          <img className="w-8 h-8 rounded-full mr-1" alt="" src="/mask-group.svg" />
          <div className=" font-semibold" style={{ fontSize: "16px" }}>{title}</div>
          <div
            className={`ml-2 font-semibold text-xs px-2 py-1 rounded ${
              status === 'Active' ? 'bg-[#6FCF97] text-[#219653] border border-[#219653]' :
              status === 'Created' ? 'bg-[#F3CCFF] text-[#A555EC] border border-[#D09CFA]' :
              'bg-[#BD3D44] text-[#AE1820] border border-[#AE1820]'
            }`
            }
            style={{ fontSize: "15px" }}
          >
            {status}
          </div>

        </div>
         
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="w-4/5 h-4/5  md:w-[159px] md:h-[58px] bg-[#474747] leading-[15px] p-2 rounded inline-block" style={{ fontSize: "0.75rem" }}>
            <p className="m-0">
              <b>{gpuQuantity}</b>
            </p>
            <p className="text-gray-400 m-1">GPU Quantity</p>
          </div>
          <div className="w-4/5 h-4/5  md:w-[159px] md:h-[58px] bg-[#474747] leading-[15px] p-2 rounded inline-block" style={{ fontSize: "0.75rem" }}>
            <div>
              <p className="font-bold m-0">{ram}</p>
              <p className="text-gray-400 m-1">RAM</p>
            </div>
          </div>
          <div className="w-4/5 h-4/5  md:w-[159px] md:h-[58px] bg-[#474747] leading-[15px] p-2 rounded inline-block" style={{ fontSize: "0.75rem" }}>
            <div>
              <p className="font-bold m-0">{cpuCores}</p>
              <p className="text-gray-400 m-1">CPU Cores</p>
            </div>
          </div>
          
        </div>
        <div className="flex justify-start items-center mt-1">
        <button
          className="font-bold text-sm px-0 py-2 rounded hover transition duration-300 text-red-600"
          style={{ marginRight: "5px" }} // Reduced margin-right
          onClick={handleStopExecutor}
        >
          <StopIcon className='mr-3' />
        </button>
        <button
          className="font-bold text-[#6495ED] text-sm px-4 py-2 rounded hover transition duration-300"
          style={{ marginRight: "10px" }}
          onClick={handleShowInstructions}
        >
          Show Instructions
        </button>
      </div>
      </div>
      </div>
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handlePanelClose}></div>
          <div className="relative z-10">
            <MyPodPanel isOpen={isPanelOpen} onClose={handlePanelClose} executorId={executorId}/>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPodsCard;