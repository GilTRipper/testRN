import React from "react";
import { AppType } from "./app";

export const AppContext = React.createContext<AppType>({} as AppType);

type AppProviderProps = {
  app: AppType;
  children: React.ReactNode;
};

export const AppProvider = ({ app, children }: AppProviderProps) => {
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};
