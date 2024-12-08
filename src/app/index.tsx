import React, { Suspense } from "react";
import { Loader } from "../shared/ui";
import { BrowserRouter } from "react-router-dom";
import "./styles.scss";
import { Routing } from "../pages/lib/guards";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader size={"200px"} color={"blue"}/>}>
        <Routing />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
