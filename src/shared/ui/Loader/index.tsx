import React from "react";
import { PulseLoader, Message } from "./style.ts";

interface LoaderProps {
  message?: string;
}
export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <>
      <PulseLoader />
      <Message>{message}</Message>
    </>
  );
};
