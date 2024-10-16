import React from "react";
import { Routes, Route } from "react-router-dom";
import { MyPulse } from "../../pages";

interface UserProps {
  role: string;
}

export const User: React.FC<UserProps> = ({ role }) => {
  return (
    <Routes>
      <Route path="/myPulse" element={<MyPulse role={role} />} />
    </Routes>
  );
};
