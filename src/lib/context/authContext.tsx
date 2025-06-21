import { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import customFetch from "@/axios";

export const setUserDataToLocalStorage = (userData: any) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};
const getUserDataFromLocalStorage = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || null;
  return userData;
};

const AuthContext = createContext({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authData, setAuthData] = useState({
    userData: getUserDataFromLocalStorage(),
    accessToken: "",
  });

  const {
    isLoading: isAuthTokenLoading,
    isError: isAuthTokenError,
    data,
    isSuccess,
  } = useQuery({
    queryKey: ["refresh-token"],
    queryFn: () => customFetch("/api/auth/refresh", { withCredentials: true }),
    enabled: !authData.accessToken,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data?.data?.accessToken) {
      console.log("refresh token generated new access token on app load");
      setAuthData((prevState) => ({
        ...prevState,
        accessToken: data.data.accessToken,
      }));
    }
    if (isAuthTokenError) {
      setAuthData({
        userData: null,
        accessToken: "",
      });
      localStorage.removeItem("userData");
    }
  }, [isAuthTokenError, isAuthTokenLoading, data]);

  const loginHandler = (authData: any) => {
    const { userData, accessToken } = authData;
    setUserDataToLocalStorage(userData);
    setAuthData({
      userData,
      accessToken,
    });
  };

  return (
    <AuthContext.Provider
      value={{ authData, isAuthTokenError, isAuthTokenLoading, loginHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
