import React, { useState } from 'react';
import '../app/globals.css';
import PopupPanel from '../components/PopupPanel';
import { useRouter } from 'next/router';

interface GpuCardProps {
  title: string;
  gpuQuantity: number;
  cpuCores: number;
  ram: number;
  price: string;
  nodeId: string;
  currentPage: string;
}

const GpuCard: React.FC<GpuCardProps> = ({
  title,
  gpuQuantity,
  cpuCores,
  ram,
  price,
  nodeId,
  currentPage,
}) => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleCardClick = () => {
    if (typeof window !== 'undefined') {
      // Check if the current page is 'console'
      if (currentPage === 'console') {
        // Use Next.js router for client-side redirection
        setShowLoginPopup(true);
        setTimeout(() => {
          setShowLoginPopup(false);
          router.push('/login');
        }, 1100); // Show the popup for 2 seconds before redirecting
      } else {
        // Open the panel otherwise
        setPanelOpen(true);
      }
    }
  };

    const handlePanelClose = () => {
        setPanelOpen(false); // Close the panel
    };

    return (
        <>
            <div
                className="w-4/5 h-2/3 md:w-[363px] md:h-[285px] relative bg-[#292929] rounded-xl p-4 text-white transition duration-300 ease-in-out hover:border-2 hover:border-white"
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'white';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                }}
                onClick={handleCardClick}
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="relative flex items-center mb-3">
                        <img className="w-8 h-8 rounded-full mr-2" alt="" src="/mask-group.svg"/>
                        <div className="text-sm font-semibold">{title}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div
                            className="w-4/5 h-4/5  md:w-[159px] md:h-[58px] bg-[#474747] leading-[15px] p-2 rounded inline-block"
                            style={{fontSize: "0.75rem"}}>
                            <p className="m-0">
                                <b>{gpuQuantity}</b>
                            </p>
                            <p className="text-gray-400 m-1">GPU Quantity</p>
                        </div>
                        <div
                            className="w-4/5 h-4/5  md:w-[159px] md:h-[58px] bg-[#474747] leading-[15px] p-2 rounded inline-block"
                            style={{fontSize: "0.75rem"}}>
                            <div>
                                <p className="font-bold m-0">{ram}</p>
                                <p className="text-gray-400 m-1">RAM</p>
                            </div>
                        </div>
                        <div
                            className="w-4/5 h-4/5  md:w-[159px] md:h-[58px] bg-[#474747] leading-[15px] p-2 rounded inline-block"
                            style={{fontSize: "0.75rem"}}>
                            <div>
                                <p className="font-bold m-0">{cpuCores}</p>
                                <p className="text-gray-400 m-1">CPU Cores</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center mt-1">
          <span className="font-bold text-[#6495ED]"
                style={{fontSize: "1.05rem", marginRight: "30px"}}> {/* Added marginRight */}
              {price}
          </span>
        </div>
      </div>
      </div>
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handlePanelClose}></div>
          <div className="relative z-10">
            <PopupPanel isOpen={isPanelOpen} onClose={handlePanelClose} gpuName={title} price={price} nodeId={nodeId}
            gpus={gpuQuantity} cpucores={cpuCores} dram={ram}
            
            
            />
          </div>
        </div>
      )}
     {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowLoginPopup(false)}></div>
          <div className="relative z-10 bg-[#474747] p-6 rounded-lg shadow-lg flex items-center justify-center w-80 h-100">
            <p>You need to login to rent a GPU</p>
          </div>
        </div>
      )} 
      
      
    </>
  );
};

export default GpuCard;
