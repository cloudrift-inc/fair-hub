import React from "react";
import Layout from "../components/Layout";
import Profile from "../components/Profile";
import "../app/globals.css";
import NotificationSettings from "../components/Notification";
import LoginSettings from "../components/LoginSettings";
import APIKeys from "../components/APIKeys";

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <Layout>
        <h1 className="mb-6 text-2xl font-medium text-white">
          Settings and Profile
        </h1>
        <Profile />
      </Layout>
    </div>
  );
};

export default SettingsPage;
