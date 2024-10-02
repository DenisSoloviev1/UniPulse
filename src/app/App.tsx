import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import AddPulse from "../pages/AddPulse";
import MyPulse from "../pages/MyPulse";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddPulse />} />
          <Route path="/myPulse" element={<MyPulse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
