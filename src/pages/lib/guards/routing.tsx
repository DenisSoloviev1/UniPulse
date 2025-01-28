import { Routes } from "react-router-dom";
import { privateRoutes } from "../index";
import { CreateRoute } from "./index";

export const Routing = () => {
  return <Routes>{privateRoutes.map(CreateRoute)}</Routes>;
};
