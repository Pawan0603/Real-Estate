"use client"
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [Uname, setUname] = useState();
  const [Uemail, setUemail] = useState();
  const [navbarKey, setNavbarKey] = useState();
  const [reRenderKey, setReRenderKey] = useState();

  const fetchUser = async (token) => {
    console.log("running fetchUser")
    const response = await fetch(`/api/getUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    })
    const res = await response.json()
    // console.log(res)
    if (res.success) {
      setUname(res.User[0].name);
      setUemail(res.User[0].email);
      setNavbarKey(Math.random());
      setReRenderKey(Math.random());
    }

    return res
  }

  const value = { Uname, setUname, Uemail, setUemail, navbarKey, setNavbarKey, fetchUser, reRenderKey }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext)
