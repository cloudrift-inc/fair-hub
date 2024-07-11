import React , { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Profile from "../components/Profile";
import "../app/globals.css";

const SettingsPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <Layout isLoggedIn={isLoggedIn}>
        <h1 className="mb-6 text-2xl font-medium text-white">
          Settings and Profile
        </h1>
        <Profile />
      </Layout>
    </div>
  );
};

export default SettingsPage;
