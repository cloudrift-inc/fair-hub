import React , { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MyPodsDashboard from "@/components/MyPodsDashboard";
import AvailableCredits from "@/components/AvailableCredits";
import "../app/globals.css";
import { PageTitle } from '../components/PageTitle';


const MyPods: React.FC = () => {
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
          <h1 className="text-2xl font-medium text-white">My Pods</h1>
          <AvailableCredits />
        </div>
        <MyPodsDashboard />
      </Layout>
    </div>
  );
};

export default MyPods;
