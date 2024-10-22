import React from "react";
import { Routes, Route } from "react-router-dom";
import {AddPulse, MyPulse} from "../../pages";
import { Roles } from "../../shared/types";

interface EditorProps {
  role: Roles;
}

export const Editor: React.FC<EditorProps> = ({ role }) => {
  return (
    <Routes>
      <Route path="/addPulse" element={<AddPulse role={role} />} />
      <Route path="/myPulse" element={<MyPulse role={role} />} />
    </Routes>
  );
};