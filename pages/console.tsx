// pages/console.tsx
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from 'react';
import '../app/globals.css';
import GPUInfoDashboard from '../components/GPUInfoDashboard';
import SidebarConsole from '../components/SidebarConsole';
import SidebarMyPods from '../components/SideBarMyPods';
import ConsoleHeader from '../components/ConsoleHeader';

const ConsolePage: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (

    <div className="relative w-full bg-[#1C1C1C] min-h-screen overflow-hidden text-left text-sm text-white font-robuous">
      <ConsoleHeader />
      <b className="absolute top-[115px] left-[305px] text-lg inline-block">
        GPU Search Console
      </b>
      <div className="flex flex-row">
        <div className="border-gray-100">
          <nav>
          {isLoggedIn ? <SidebarMyPods /> : <SidebarConsole />}
          </nav>
          <div className="relative pt-10 sm:pt-40 mt-10 md:ml-[284px] md:mt-3">
            {isLoggedIn ? <GPUInfoDashboard currentPage="console_login" /> : <GPUInfoDashboard currentPage="console" />}
          </div>
          <div className="absolute top-0 left-full h-full w-px bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ConsolePage;
