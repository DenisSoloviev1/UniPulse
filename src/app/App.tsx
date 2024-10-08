import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Auth from "../pages/Auth";
import AddPulse from "../pages/AddPulse";
import MyPulse from "../pages/MyPulse";
import NotFound from "../pages/NotFound";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/addPulse" element={<AddPulse />} />
          <Route path="/myPulse" element={<MyPulse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
