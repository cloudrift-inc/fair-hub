import React, { useState, ReactNode } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Button from "./foundational/Button";

interface SettingsCardProps {
  title: string;
  icon: ReactNode;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  icon,
  children,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto mt-5 rounded-lg bg-[#111111] bg-grain p-5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h2 className="ml-6 text-large font-medium text-white">{title}</h2>
        </div>
        <div className="flex items-center space-x-2">
          {open && (
            <button onClick={() => setEditMode(!editMode)}>
              <EditIcon className="text-white" />
            </button>
          )}
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <ExpandLessIcon className="text-white" />
            ) : (
              <ExpandMoreIcon className="text-white" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <>
          <hr className="my-6 w-full border-black" />
          <div className="flex items-start rounded-lg p-4">
            <div className="w-full">
              {editMode ? children : <div>{children}</div>}
            </div>
          </div>
          {editMode && (
            <div className="mt-5 flex justify-end space-x-3">
              <Button
                onClick={() => setEditMode(false)}
                className="rounded-medium bg-[#212121] px-4 py-3 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setEditMode(false)}
                className="rounded-medium bg-[#191970] px-4 py-3 text-white"
              >
                Save
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SettingsCard;
