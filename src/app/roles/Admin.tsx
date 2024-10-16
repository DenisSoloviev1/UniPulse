import React from "react";
import { Routes, Route } from "react-router-dom";
import AddPulse from "../../pages/AddPulse";
import MyPulse from "../../pages/MyPulse";

interface AdminProps {
  role: string;
}

const Admin: React.FC<AdminProps> = ({ role }) => {
  return (
    <Routes>
      <Route path="/addPulse" element={<AddPulse role={role} />} />
      <Route path="/myPulse" element={<MyPulse role={role} />} />
    </Routes>
  );
};

export default Admin;
