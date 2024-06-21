import Link from "next/link";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 border-r-2 border-[#222222] bg-[#1C1C1C] p-4 text-small text-white">
      <nav>
        <ul>
          <li className="mb-3">
            <Link href="/console">
              <span className="flex items-center rounded  p-2  hover:bg-gray-700">
                <HomeIcon className="mr-2" />
                Console
              </span>
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/billing">
              <span className="flex items-center rounded p-2 hover:bg-gray-700">
                <AccountBalanceIcon className="mr-2" />
                Billing
              </span>
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/settings">
              <span className="flex items-center rounded bg-[#152259] p-2 hover:bg-blue-600">
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
