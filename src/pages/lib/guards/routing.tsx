import { Routes, Route } from "react-router-dom";
import { privateRoutes } from "../index";
import { CreateRoute } from "./index";
import { Auth } from "../../Auth";
import { NotFound } from "../../NotFound";

export const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Auth />} />
      <Route path={"*"} element={<NotFound />} />
      {privateRoutes.map(CreateRoute)}
    </Routes>
  );
};
