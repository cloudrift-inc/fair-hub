// pages/console.tsx
import type { NextPage } from "next";
import React, { useEffect, useState } from 'react';
import '../app/globals.css';
import Layout from "@/components/Layout";
import GPUInfoDashboard from "../components/GPUInfoDashboard";
import AvailableCredits from "@/components/AvailableCredits";
import { PageTitle } from '../components/PageTitle';



const ConsolePage: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <PageTitle />
      <Layout isLoggedIn={isLoggedIn}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-white">GPU Search Console</h1>
          <AvailableCredits />
        </div>
        {isLoggedIn ? <GPUInfoDashboard currentPage="console_login" /> : <GPUInfoDashboard currentPage="console" />}
      </Layout>
    </div>
  );
};

export default ConsolePage;

