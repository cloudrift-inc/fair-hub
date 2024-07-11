import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from './foundational/Link';
import { useMutation } from "@tanstack/react-query";
import Button from './foundational/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { ProfileData, fetchProfile } from "./ProfileFetch";
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
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

  const profileMutation = useMutation<ProfileData, Error, string>({
    mutationFn: fetchProfileData,
    onSuccess: (data) => {
      setProfile(data);
    },
    onError: (error) => {
      setError(error.message);
      console.error("Error fetching profile:", error);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      setIsLoggedIn(true);
      profileMutation.mutate(token);
    } else {
      setError("No auth token found");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setProfile(null);
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
    <div className="flex items-center justify-between border-b-2 border-[#222222] bg-[#1C1C1C] p-3 text-white">
      <div className="ml-4 flex items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={220} height={220} />
        </Link>
      </div>
      <div className="flex items-center gap-4 mr-4">
        {isLoggedIn ? (
          <div className="relative flex items-center space-x-2">
            <button className="flex items-center space-x-2" onClick={handleButtonClick}>
              <span>{profile ? profile.name : "Username"}</span>
              <Image
                src="/profile.png"
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute top-12 right-0 mt-2 w-28 bg-[#292929] rounded-md shadow-lg z-10">
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
  );
};

export default Navbar;
