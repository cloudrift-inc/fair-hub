import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "./foundational/Link"
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import { fetchProfile } from "./ProfileFetch";

interface ProfileData {
  name: string;
}

const Navbar: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fetchProfileData = async (token: string): Promise<ProfileData> => {
    try {
      const data = await fetchProfile(token);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch profile data`);
    }
  };


  const mutation = useMutation<ProfileData, Error, string>({
    mutationFn: fetchProfileData,
    onSuccess: (data) => {
      setUsername(data.name);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      mutation.mutate(token);
    } else {
      setError("No auth token found");
    }
  }, []);



  return (
    <div className="flex items-center justify-between border-b-2 border-[#222222] bg-[#1C1C1C] p-3 text-white">
      <div className="ml-4 flex items-center">
      <Link href="/" >
        <Image src="/logo.png" alt="Logo" width={220} height={220} />
        </Link>
      </div>
      <div className="flex items-center">
        <span className="mr-3">{username}</span>
        <Image
          src="/profile.png"
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full"
        />      </div>
    </div>
  );
};

export default Navbar;
