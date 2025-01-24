import { Suspense } from "react";
import { Loader } from "../shared/ui";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "../pages/lib/guards";
import "./styles.scss";
import { useFetchRole } from "../shared/hooks/useFetchRole";

const App = () => {
  const { isLoading, isError } = useFetchRole();

  if (isLoading) {
    return <Loader size={"200px"} color={"blue"} />;
  }

  if (isError) {
    return <p>Извините что-то пошло не так</p>;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader size={"200px"} color={"blue"} />}>
        <Routing />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
