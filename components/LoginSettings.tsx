import React, { useState, ChangeEvent } from "react";
import SettingsCard from "./SettingsCard";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";

const LoginSettings: React.FC = () => {
  return (
    <SettingsCard
      title="Login Settings"
      icon={
        <BuildCircleOutlinedIcon
          className="text-white"
          style={{ fontSize: "2rem" }}
        />
      }
    >
      <div className="space-y-6 text-white ">
        <div className="flex flex-col"></div>
        <div className="flex flex-col"></div>
      </div>
    </SettingsCard>
  );
};

export default LoginSettings;
