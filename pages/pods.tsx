import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../components/foundational/Button';
import Link from "../components/foundational/Link";

import '../app/globals.css';
import MyPodsDashboard from '../components/MyPodsDashboard';
import SidebarMyPods from '../components/SideBarMyPods';
import ConsoleHeader from '../components/ConsoleHeader';

const ConsoleRenting: NextPage = () => {
  const [credit, setCredit] = useState(0);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <div className="relative w-full bg-[#1C1C1C] min-h-screen overflow-hidden text-left text-sm text-white font-robuous">
        <ConsoleHeader />
      <b className="absolute top-[115px] left-[305px] text-lg inline-block">
        My Pods
        </b>
        <div className="flex flex-row">
        <div className=" border-gray-100">
          <nav>
            <SidebarMyPods />
          </nav>
          <div className="relative pt-10 sm:pt-40 mt-10 md:ml-[284px] md:mt-3 ">
            <MyPodsDashboard />
          </div>
        </div>
        </div>
      </div>
  );
};

export default ConsoleRenting;