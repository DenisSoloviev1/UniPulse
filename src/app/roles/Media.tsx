import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddPulse, MyPulse } from "../../pages";

interface MediaProps {
  role: string;
}

export const Media: React.FC<MediaProps> = ({ role }) => {
  return (
    <Routes>
      <Route path="/addPulse" element={<AddPulse role={role} />} />
      <Route path="/myPulse" element={<MyPulse role={role} />} />
    </Routes>
  );
};
