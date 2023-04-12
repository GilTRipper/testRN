import { useContext } from "react";
import { AppContext } from "../core/AppContext";

export const useApp = () => {
  const app = useContext(AppContext);
  return app;
};
