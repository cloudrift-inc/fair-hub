import Link from "./foundational/Link";
import { useRouter } from "next/router";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";
import MemoryIcon from "@mui/icons-material/Memory";

interface SidebarProps {
  LoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ LoggedIn }) => {
  const router = useRouter();

  return (
    <div className="h-screen w-64 border-r-2 border-[#222222] bg-[#1C1C1C] p-4 text-small text-white">
      <nav>
        <ul>
          <li className="mb-3">
            <Link href="/console">
              <span
                className={`flex items-center rounded p-2 ${
                  router.pathname === "/console" ? "bg-[#191970] hover:bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <HomeIcon className="mr-2" />
                Console
              </span>
            </Link>
          </li>
          {LoggedIn==true && (
            <li className="mb-3">
              <Link href="/pods">
                <span
                  className={`flex items-center rounded p-2 ${
                    router.pathname === "/pods" ? "bg-[#191970] hover:bg-blue-700" : "hover:bg-gray-700"
                  }`}
                >
                  <MemoryIcon className="mr-2" />
                  My Pods
                </span>
              </Link>
            </li>
          )}
          <li className="mb-3">
            <Link href="/transactions">
              <span
                className={`flex items-center rounded p-2 ${
                  router.pathname === "/transactions" ? "bg-[#191970] hover:bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <AccountBalanceIcon className="mr-2" />
                Billing
              </span>
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/settings">
              <span
                className={`flex items-center rounded p-2 ${
                  router.pathname === "/settings" ? "bg-[#191970] hover:bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <SettingsIcon className="mr-2" />
                Settings and Profile
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
