import React from "react";
import { Routes, Route } from "react-router-dom";
import MyPulse from "../../pages/MyPulse";

interface UserProps {
  role: string;
}

const User: React.FC<UserProps> = ({ role }) => {
  return (
    <Routes>
      <Route path="/myPulse" element={<MyPulse role={role} />} />
    </Routes>
  );
};

export default User;
