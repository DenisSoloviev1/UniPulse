import React from "react";
import { Routes, Route } from "react-router-dom";
import { MyPulse } from "../../pages";
import { Roles } from "../../shared/types";

interface UserProps {
  role: Roles;
}

export const User: React.FC<UserProps> = ({ role }) => {
  return (
    <Routes>
      <Route path="/myPulse" element={<MyPulse role={role} />} />
    </Routes>
  );
};
