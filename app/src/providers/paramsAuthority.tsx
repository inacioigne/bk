"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ContextType = {
  paramsAuthority: URLSearchParams;
  updateParamsAuthority: Function
};

export const ParamsAuthorityContext = createContext<ContextType | undefined>(undefined);


export const ParamsAuthorityProvider = ({ children }: { children: ReactNode }) => {

  const params = new URLSearchParams();
  params.append("q", "search_general:*");
  params.append("facet", "true");
  params.append("facet.field", "type");
  // params.append("facet.field", "affiliation_str");
  // params.append("facet.field", "occupation_str");
  const [paramsAuthority, setSearchParams] = useState(params);

  const updateParamsAuthority = (newParams: any) => {
    setSearchParams(newParams);
  };
  const contextValue: ContextType = {
    paramsAuthority, updateParamsAuthority
  };

  return (
    <ParamsAuthorityContext.Provider
    // value={contextValue}
      value={{ paramsAuthority, updateParamsAuthority }}
    >
      {children}
    </ParamsAuthorityContext.Provider>
  );
};

export const useParmasAutority = () => useContext(ParamsAuthorityContext);