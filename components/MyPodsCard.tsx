import React, { useState } from 'react';
import '../app/console.css';
import MyPodPanel from '../components/MyPodPanel';

interface MyPodsCardProps {
  title: string;
  gpuQuantity: number;
  cpuCores: number;
  storage: string;
  ram: string;
  status:string;
}

const MyPodsCard: React.FC<MyPodsCardProps> = ({
  title,
  gpuQuantity,
  cpuCores,
  storage,
  ram,
  status
}) => {
  const [isPanelOpen, setPanelOpen] = useState(false);

  const handleShowInstructions = () => {
    setPanelOpen(true);
  };

  const handlePanelClose = () => {
    setPanelOpen(false);
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
              status === 'Active' ? 'bg-[#6FCF97] text-[#219653] border border-[#219653]' : 'bg-[#BD3D44] text-[#AE1820] border border-[#AE1820]'}`
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
          <div className="w-4/5 h-4/5 md:w-[159px] md:h-[58px] bg-[#474747] leading-[15px] p-2 rounded inline-block" style={{ fontSize: "0.75rem" }}>
            <div>
              <p className="font-bold m-0">{storage}</p>
              <p className="text-gray-400 m-1">Storage</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center mt-1">
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
            <MyPodPanel isOpen={isPanelOpen} onClose={handlePanelClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default MyPodsCard;
