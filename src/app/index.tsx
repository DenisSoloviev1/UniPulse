import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./styles.scss";
import { Routing } from "../pages/lib/guards";

const App: React.FC = () => {
  
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default App;
