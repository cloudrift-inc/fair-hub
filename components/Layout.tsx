import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar_Profile";
interface LayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar LoggedIn={isLoggedIn}/>
        <div className="flex-grow">
          <main className=" p-7 text-white">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
