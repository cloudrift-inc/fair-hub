// PopupPanel.tsx
import * as React from "react";
import {useMutation} from '@tanstack/react-query';
import '../app/globals.css';
import { useRouter } from 'next/router';
import MyPodPanel from './MyPodPanel'; // Adjust the import path if necessary
import {getApiKey, getApiUrl} from '@/lib/faircompute';

interface RequestData {
    node_id: string;
    cpus: number;
    gpus: number;
    dram: number;
    disk: number;
    auto_deactivate: boolean;
    provider_name: string;
    instance_type_name: string;
}

interface ResponseData {
    executor_id: string;
}

interface PopupPanelProps {
    isOpen: boolean;
    onClose: () => void;
    gpuName: string;
    price: string;
    nodeId: string; 
}

const createExecutor = async (requestData: RequestData) => {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/v1/executors/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-API-Key": getApiKey(),
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            "version": "2024-06-17",
            "data": requestData,
        })
    });

    if (!response.ok) {
        let error = await response.text();
        console.error(error);
        throw new Error('Error creating executor: ' + error);
    }

    const data = await response.json();
    return data["data"];
};

const useCreateExecutor = () => {
    return useMutation<ResponseData, Error, RequestData>({
        mutationFn: createExecutor,
    });
};

function PopupPanel({isOpen, onClose, gpuName, price, nodeId}: PopupPanelProps) {
    const [gpuQuantity, setGpuQuantity] = React.useState(0);
    const [gpuCores, setGpuCores] = React.useState(0);
    const [ram, setRam] = React.useState(0);
    const [showMyPodPanel, setShowMyPodPanel] = React.useState(false);
    const [isRented, setIsRented] = React.useState(false);
    const {mutate, isPending, isError, data} = useCreateExecutor();
    const [formError, setFormError] = React.useState('');
    const router = useRouter();

    const handleSubmit = () => {
        // if (gpuQuantity === 0) {
        //     setFormError('Please select a GPU quantity');
        //     return;
        // }
        if (gpuCores === 0) {
            setFormError('Please select the number of GPU cores');
            return;
        }
        if (ram === 0) {
            setFormError('Please enter the required RAM');
            return;
        }
        

        setFormError('');

        const requestData: RequestData = {
            node_id: nodeId,
            cpus: 1,
            gpus: gpuQuantity,
            dram: ram *(1024* 1024* 1024),
            disk: 0,
            auto_deactivate: false,
            provider_name: "test_provider",
            instance_type_name: "test_instance",

        };
        mutate(requestData);
        setIsRented(true);

        setTimeout(() => {
            setShowMyPodPanel(true);
        }, 3000);
        setIsRented(true);
    };

    React.useEffect(() => {
        if (showMyPodPanel) {
            const timer = setTimeout(() => {
                router.push('/pods');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showMyPodPanel]);


    if (!isOpen) {
        return null;
    }

    if (showMyPodPanel) {
        return <MyPodPanel isOpen={isOpen} onClose={onClose} />;
    }

    if (isRented) {
        return (
            <div
            className="fixed inset-y-0 right-0 flex flex-col justify-center w-full max-w-sm p-6 bg-[#1C1C1C] shadow-lg">
                <div className="absolute top-8 left-4">
                    <button className="text-white" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                    </button>
                </div>


                <div className="relative flex items-center justify-center w-full h-64 ">
                    <p className="absolute left-0 ml-4 text-white">0</p>
                    <img src="/renting.svg" alt="Rented GPU" className="w-4/5 h-auto"/>
                    <p className="absolute right-0 mr-4 text-white">10</p>
                </div>
                <p className="mt-4 text-white text-md">Renting NVIDIA GeForce RTX 4090 Now!</p>
                <div className="mt-8 w-64 h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-full bg-blue-500 rounded-full animate-pulse"></div>
                </div>
            </div>
        );
    }
    return (
        <div
            className="fixed inset-y-0 right-0 flex flex-col justify-center w-full max-w-sm p-6 bg-[#1C1C1C] shadow-lg">
            <button
                className="absolute top-4 right-4 text-white hover:text-zinc-300"
                onClick={onClose}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div className="flex items-center justify-start px-3 py-2 bg-[#292929] mb-6 mt-8 rounded-lg ">
                <img
                    loading="lazy"
                    src="/mask-group.svg"
                    className="w-7 h-7 mr-2"
                    alt="USA Flag"
                />
                <p className="text-md font-bold text-white">{gpuName}</p>
                <p className="ml-auto text-sm text-blue-500">{price}</p>
            </div>

            <div className="flex flex-col w-full space-y-4 ">
                <div className="px-4 py-2 bg-[#292929] rounded-lg">
                    <p className="mb-2 text-xs text-white">Choose GPU Quantity</p>
                    <div className="flex items-center justify-between p-1 bg-neutral-800 rounded-md">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={gpuQuantity}
                            onChange={(e) => setGpuQuantity(Number(e.target.value))}
                            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#191970]"
                        />
                        <span className="ml-4 text-white">{gpuQuantity}</span>
                    </div>
   
                </div>

                <div className="px-3 py-1 bg-[#292929] rounded-lg">
                    <p className="mb-2 text-xs text-white">Choose CPU Cores</p>
                    <div className="flex items-center justify-between p-2 bg-neutral-800 rounded-md">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={gpuCores}
                            onChange={(e) => setGpuCores(Number(e.target.value))}
                            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#191970]"
                        />
                        <span className="ml-4 text-white">{gpuCores}</span>
                    </div>
                </div>

                <div className="px-3 py-1 bg-[#292929] rounded-lg">
                    <p className="mb-2 text-xs text-white">Enter Required RAM</p>
                    <div className="flex items-center justify-between p-2 bg-neutral-800 rounded-md">
                        <input
                            type="number"
                            min="0"
                            max="62"
                            value={ram}
                            onChange={(e) => setRam(Number(e.target.value))}
                            className="w-full px-2 py-1 text-white bg-transparent outline-none hover:border hover:border-white"
                        />
                        <p className="text-sm text-zinc-400">GB</p>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">Limited up to 62 GB</p>
                </div>

            </div>
            {formError && (
                <p className="mt-4 text-red-500">{formError}</p>
            )}
            <div className="flex justify-end w-full gap-4 px-3 py-6 mt-auto max-md:flex-col max-md:items-stretch">
                <button
                    className="px-6 py-2 text-sm font-medium text-white bg-neutral-800 border border-zinc-500 rounded-lg"
                    onClick={onClose}
                >
                    Cancel
                </button>

                <button
                    className="px-6 py-2 text-sm font-medium text-white bg-[#191970] rounded-lg"
                    onClick={handleSubmit}
                    disabled={isPending}
                >
                    {isPending ? "Renting GPU..." : "Rent GPU"}
                </button>
            </div>

            {isError && <p className="text-red-500">Error renting GPU. Please try again.</p>}
            {data && <p className="text-green-500">GPU rented successfully. Executor ID: {data.executor_id}</p>}
        </div>
    );
}

export default PopupPanel;
