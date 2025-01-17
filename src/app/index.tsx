import React from "react";
import { Suspense } from "react";
import { Loader } from "../shared/ui";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "../pages/lib/guards";
import "./styles.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader size={"200px"} color={"blue"} />}>
        <Routing />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
