import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddPulse, MyPulse } from "../../pages";

interface AdminProps {
  role: string;
}

export const Admin: React.FC<AdminProps> = ({ role }) => {
  return (
    <Routes>
      <Route path="/addPulse" element={<AddPulse role={role} />} />
      <Route path="/myPulse" element={<MyPulse role={role} />} />
    </Routes>
  );
};
