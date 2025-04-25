// util/ApiContext.tsx
import { createContext, useContext, ReactNode } from "react";

const getApiUrlFromQuery = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("apiUrl") ?? "http://127.0.0.1:8080/";
};

const ApiContext = createContext<string>(getApiUrlFromQuery());

export const useApiUrl = () => useContext(ApiContext);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl = getApiUrlFromQuery();

  return <ApiContext.Provider value={apiUrl}>{children}</ApiContext.Provider>;
};
