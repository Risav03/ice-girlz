"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode, useEffect } from "react";

type GlobalContextType = {
  
}

const GlobalContext = createContext<GlobalContextType>({
  
});

export const GlobalContextProvider = ({ children } : { children: ReactNode}) => {


  return (
    <GlobalContext.Provider value={{}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
