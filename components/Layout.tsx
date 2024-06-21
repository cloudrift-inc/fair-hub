import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar_Profile";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <main className=" p-7 text-white">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
