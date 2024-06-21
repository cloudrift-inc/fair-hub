import React, { useState, ChangeEvent } from "react";
import SettingsCard from "./SettingsCard";
import NatIcon from "@mui/icons-material/Nat";
const APIKeys: React.FC = () => {
  return (
    <SettingsCard
      title="API Keys"
      icon={<NatIcon className="text-white" style={{ fontSize: "2rem" }} />}
    >
      <div className="space-y-6 text-white">
        <div className="flex flex-col"></div>
        <div className="flex flex-col"></div>
      </div>
    </SettingsCard>
  );
};

export default APIKeys;
