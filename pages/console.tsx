import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import '../app/globals.css';
import Button from '../components/foundational/Button';
import GPUInfoDashboard from '../components/GPUInfoDashboard';
import SidebarConsole from '../components/SidebarConsole';
import GpuCard from '../components/GpuCard';
import MyPodsCard from '../components/MyPodsCard';
import { useRouter } from 'next/router';

const ConsoleRenting: NextPage = () => {
  const [credit, setCredit] = useState(0);
  const [filter, setFilter] = useState('');
  const [gpuList, setGpuList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    // This will run only on the client side
    setCurrentPage(window.location.pathname);
    setCredit(0); // Set this to the actual value fetched from an API
  }, []);
  const handleSignUpClick = () => {
    router.push('/register');
  };

  const onGroupContainerClick = useCallback(() => {
    // Add logic to handle group container click, such as navigation or opening a modal
  }, []);

  useEffect(() => {
    // Fetch available credit from an API or another source
    // For demonstration, we'll set a static value
    setCredit(0); // Set this to the actual value fetched from an API
  }, []);

  useEffect(() => {
    // Fetch the GPU list from an API or another source based on the filter and searchTerm
    // For demonstration, we'll set a static value
    
  }, [filter, searchTerm]);

  return (
    <div className="relative w-full bg-[#1C1C1C] min-h-screen overflow-hidden text-left text-sm text-white font-robuous">
      <b className="absolute top-[119px] md:right-[128px] right-[95px] text-sm inline-block">
        Available Credit : ${credit}
      </b>
      <b className="absolute top-[115px] left-[305px] text-sm inline-block">
        GPU Search Console
      </b>

      <div className="flex flex-row">
        <div className=" border-gray-100">
          <nav >
          <SidebarConsole />
          </nav>
          

          <div className="absolute top-0 left-full h-full w-px bg-gray-300"></div>
        </div>

        <div className="flex-1">
          <div className="absolute top-0 left-0 w-full h-[85px] bg-black-100 shadow-md flex items-center justify-between border-b border-[#292929]">
            <div className="flex items-center">
              <div className="ml-4">
                <Image src='/logo.png' alt='NeuralRack Hosting Logo' width={280} height={280} className='shrink-0' />
              </div>
            </div>
            <div className="flex items-center gap-4 mr-4">
              <Button className="rounded-21xl bg-black-100 py-2.5 px-6 font-nunito-sans" onClick={handleSignUpClick}
              >
                <div className="relative tracking-[0.1px] leading-[20px] font-medium">
                  Sign up
                </div>
              </Button>
            <Link href='/login'>
              <div className="rounded-xl bg-[#191970] py-2.5 px-6 font-nunito-sans">
                <div className="relative tracking-[0.1px] leading-[20px] font-medium">
                  Log in
                </div>
              </div>
              
              </Link>

            </div>
          </div>

      
          <div className="w-3/6 md:w-56 absolute right-[23px] md:right-[28px] top-[172px] rounded-lg bg-[#292929] h-10 flex items-center gap-4 px-4">
            <img className="w-4 h-4" alt="" src="/vector.svg" />
            <input
              type="text"
              placeholder="Search for GPUs"
              className="bg-transparent outline-none text-white w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      
      <div className="relative pt-10 sm:pt-40 mt-10 md:ml-[284px] md:mt-12 ">
            <GPUInfoDashboard currentPage="console" />
          </div>
          {/* <div className="absolute md:top-[172px] top-[232px] left-[205px] md:left-[305px] w-[130px] h-10">
            <Button className="w-26 md:w-full h-full rounded-lg bg-[#292929] flex items-center px-4">
              <div className="w-26 md:w-full text-left font-medium">Filter by</div>
            </Button>
            <img
              className="absolute top-[10px] right-2 w-6 h-6"
              alt=""
              src="/filter-icon.svg"
            />
          </div> */}
        </div>
      </div>
      
      
    </div>
  );
};

export default ConsoleRenting;
