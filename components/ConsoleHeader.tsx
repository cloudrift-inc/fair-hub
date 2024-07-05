import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from "@tanstack/react-query";
import Button from './foundational/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { ProfileData, fetchProfile } from "./ProfileFetch";
import { BalanceData, fetchBalance } from "./BalanceFetch";
import { useRouter } from 'next/router';

const ConsoleHeader: React.FC = () => {
  const [credit, setCredit] = useState(0);
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
    window.location.reload();
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
    <div className="absolute top-0 left-0 w-full h-[85px] bg-black-100 shadow-md flex items-center justify-between border-b border-[#292929]">
      <div className="flex items-center">
        <Link href='/'>
          <div className="ml-4">
            <Image src='/logo.png' alt='NeuralRack Hosting Logo' width={280} height={280} className='shrink-0' />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-4 relative mr-10">
        {isLoggedIn ? (
          <>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2" onClick={handleButtonClick}>
                <span>{profile ? profile.name : "Username"}</span>
                <img className="h-7 w-7 rounded-full overflow-hidden" alt="Profile" src="/byewind@2x.png" />
              </button>
              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute top-9 right-0 mt-2 w-28 bg-[#292929] rounded-md shadow-lg z-10">
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
            </div>
            
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
      <div className="flex items-center space-x-4 absolute top-[114px] right-10 z-10">
        <b className="text-sm inline-block">Available Credit: ${isLoggedIn ? credit : 0}</b>
        {isLoggedIn && (
          <Link href="/billing">
            <Button className="rounded-full bg-[#191970] py-2 px-4 font-bold text-sm">
              Add Credits
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ConsoleHeader;
