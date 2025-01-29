import { Suspense } from "react";
import { Loader } from "../shared/ui";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "../pages/lib/guards";
import "./styles.scss";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader size={"200px"} color={"blue"} />}>
        <Routing />
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
