import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddPulse, MyPulse } from "../../pages";

interface PublisherProps {
  role: string;
}

export const Publisher: React.FC<PublisherProps> = ({ role }) => {
  return (
    <Routes>
      <Route path="/addPulse" element={<AddPulse role={role} />} />
      <Route path="/myPulse" element={<MyPulse role={role} />} />
    </Routes>
  );
};
