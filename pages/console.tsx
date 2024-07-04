import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from "@tanstack/react-query";
import '../app/globals.css';
import Button from '../components/foundational/Button';
import GPUInfoDashboard from '../components/GPUInfoDashboard';
import SidebarConsole from '../components/SidebarConsole';
import SidebarMyPods from '../components/SideBarMyPods';
import LogoutIcon from '@mui/icons-material/Logout';
import { fetchProfile, ProfileData } from "../components/ProfileFetch";
import { fetchBalance, BalanceData } from "../components/BalanceFetch";
import { useRouter } from 'next/router';

const ConsolePage: NextPage = () => {
  const [credit, setCredit] = useState(0);
  const [filter, setFilter] = useState('');
  const [gpuList, setGpuList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [error, setError] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchProfileData = async (token: string): Promise<ProfileData> => {
    try {
      return await fetchProfile(token);
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  };

  const fetchBalanceData = async (token: string): Promise<BalanceData> => {
    try {
      return await fetchBalance(token);
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  };

  const profileMutation = useMutation<ProfileData, Error, string>({
    mutationFn: fetchProfileData,
    onSuccess: (data) => {
      console.log("Profile fetched successfully:", data);
      setProfile(data);
    },
    onError: (error) => {
      setError(error.message);
      console.error("Error fetching profile:", error);
    },
  });

  const balanceMutation = useMutation<BalanceData, Error, string>({
    mutationFn: fetchBalanceData,
    onSuccess: (data) => {
      console.log("Balance fetched successfully:", data);
      setBalance(data);
      setCredit(data.balance / 100);
    },
    onError: (error) => {
      setError(error.message);
      console.error("Error fetching balance:", error);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      setIsLoggedIn(true);
      profileMutation.mutate(token);
      balanceMutation.mutate(token);

      const interval = setInterval(() => {
        balanceMutation.mutate(token);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setProfile(null);
    setBalance(null);
    setCredit(0);
    setIsDropdownOpen(false);
  };

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative w-full bg-[#1C1C1C] min-h-screen overflow-hidden text-left text-sm text-white font-robuous">
      <b className="absolute top-[119px] md:right-[140px] right-[95px] text-sm inline-block">
        Available Credit : ${credit}
      </b>
      <b className="absolute top-[115px] left-[305px] text-lg inline-block">
        GPU Search Console
      </b>
      <div className="absolute top-[109px] md:right-[15px] right-[95px] text-sm inline-block">
        <Link href="/billing">
          <Button className="rounded-full bg-[#191970] py-2 px-4 font-bold text-sm">
            Add Credits
          </Button>
        </Link>
      </div>

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
        <div className="flex-1">
          <div className="absolute top-0 left-0 w-full h-[85px] bg-black-100 shadow-md flex items-center justify-between border-b border-[#292929]">
            <div className="flex items-center">
              <div className="ml-4">
                <Image src='/logo.png' alt='NeuralRack Hosting Logo' width={280} height={280} className='shrink-0' />
              </div>
            </div>
            <div className="flex items-center gap-4 mr-4 relative">
              {isLoggedIn ? (
                <>
                  
                  <button
                    className="flex items-center space-x-2"
                    onClick={handleButtonClick}
                  >
                    <span>{profile ? profile.name : "Username"}</span>
                    <img
                      className="h-7 w-7 rounded-full overflow-hidden"
                      alt="Profile"
                      src= "/byewind@2x.png"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div ref={dropdownRef} className="absolute top-10 right-0 mt-2 w-28 bg-[#292929] rounded-md shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-white focus:outline-none rounded-md hover:bg-gray-700"
                        onClick={handleLogout}
                      >
                        <div className="flex items-center">
                          <LogoutIcon className="mr-2" />
                          <span>Logout</span>
                        </div>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Button className="rounded-21xl bg-black-100 py-2.5 px-6 font-nunito-sans" onClick={() => router.push('/register')}>
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
                </>
              )}
            </div>
          </div>
          {/* <div className="w-3/6 md:w-56 absolute right-[23px] md:right-[25px] top-[172px] rounded-lg bg-[#292929] h-10 flex items-center gap-4 px-4">
            <img className="w-4 h-4" alt="" src="/vector.svg" />
            <input
              type="text"
              placeholder="Search for GPUs"
              className="bg-transparent outline-none text-white w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
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
          {/* </div>  */}
        </div>
      </div>
    </div>
  );
};

export default ConsolePage;
