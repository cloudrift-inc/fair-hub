import React, { useState, ChangeEvent } from "react";
import SettingsCard from "./SettingsCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  return (
    <SettingsCard
      title="Notification Settings"
      icon={
        <NotificationsOutlinedIcon
          className="text-white"
          style={{ fontSize: "2rem" }}
        />
      }
    >
      <div className="space-y-6 text-white">
        <div className="flex items-center"></div>
        <div className="flex items-center"></div>
      </div>
    </SettingsCard>
  );
};

export default NotificationSettings;
