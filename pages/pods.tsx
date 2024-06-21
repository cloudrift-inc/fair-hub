import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import '../app/globals.css';
import MyPodsDashboard from '../components/MyPodsDashboard';
import SidebarMyPods from '../components/SideBarMyPods';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log('Logging out...');
    // Navigate back to the console page
    router.push('/console');
  };

  return (
    <div className="relative">
      <button
        className="rounded-radius-12 flex flex-row flex-wrap items-center justify-start py-[9.8px] pr-px pl-8 z-[1]"
        onClick={handleButtonClick}
      >
        <div className="rounded-radius-12 flex flex-row flex-wrap items-center justify-start py-[9.8px] pr-px pl-8 z-[1]">
          <div className="rounded-radius-8 flex flex-row flex-wrap items-center justify-start py-0 pr-[5px] pl-0">
            <div className="rounded-radius-8 flex flex-col items-start justify-center">
              <a className="[text-decoration:none] relative leading-[20px] font-medium text-[inherit] inline-block min-w-[78px]">
                Username
              </a>
            </div>
            <div className="rounded-radius-8 flex flex-row items-center justify-center p-[5px] ml-[2px]">
              <img
                className="h-7 w-7 relative rounded-boundvariablesdata4 overflow-hidden shrink-0 object-cover"
                loading="lazy"
                alt=""
                src="/byewind@2x.png"
              />
            </div>
          </div>
        </div>
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-0.5 w-28 bg-[#292929] rounded-md shadow-lg">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-white focus:outline-none rounded-md"
            onClick={handleLogout}
          >
            <div className="flex items-center">
              <LogoutIcon className="mr-2" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

const ConsoleRenting: NextPage = () => {
  const [credit, setCredit] = useState(0);
  const [filter, setFilter] = useState('');
  const [gpuList, setGpuList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const onGroupContainerClick = useCallback(() => {

  }, []);

  useEffect(() => {
    // Fetch available credit from an API or another source
    setCredit(100); // Set this to the actual value fetched from an API
  }, []);

  useEffect(() => {
    
  }, [filter, searchTerm]);

  return (
    <div className="relative w-full bg-[#1C1C1C] min-h-screen overflow-hidden text-left text-sm text-white font-robuous">
      <b className="absolute top-[119px] md:right-[140px] right-[95px] text-sm inline-block">
        Available Credit : ${credit}
      </b>
      <b className="absolute top-[115px] left-[305px] text-lg inline-block">
        My Pods
      </b>
      <div className="absolute top-[109px] md:right-[15px] right-[95px] text-sm inline-block">
        <div className="rounded-full bg-[#191970] py-2 px-2.5 font-bold text-sm">
          Add Credits
        </div>
      </div>
      <div className="flex flex-row">
        <div className=" border-gray-100">
          <nav>
            <SidebarMyPods />
          </nav>
          <div className="relative pt-10 sm:pt-40 mt-10 md:ml-[284px] md:mt-12 ">
            <MyPodsDashboard />
          </div>
          <div className="absolute top-0 left-full h-full w-px bg-gray-300"></div>
        </div>
        <div className="flex-1">
          <div className="absolute top-0 left-0 w-full h-[85px] bg-black-100 shadow-md flex items-center justify-between border-b border-[#292929]">
            <div className="flex items-center">
              <div className="ml-4">
                <Image src='/logo.png' alt='NeuralRack Hosting Logo' width={280} height={280} className='shrink-0' />
              </div>
            </div>
            <div className="mr-4">
              <LogoutButton />
            </div>
          </div>
          <div className="w-3/6 md:w-56 absolute right-[23px] md:right-[25px] top-[172px] rounded-lg bg-[#292929] h-10 flex items-center gap-4 px-4">
            <img className="w-4 h-4" alt="" src="/vector.svg" />
            <input
              type="text"
              placeholder="Search for GPUs"
              className="bg-transparent outline-none text-white w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
