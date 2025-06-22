import { createContext, useState, useContext, useEffect } from "react";
import customFetch from "@/axios";

export const setUserDataToLocalStorage = (userData: any) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};
const getUserDataFromLocalStorage = () => {
  const userDataStr = localStorage.getItem("userData");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  return userData;
};

const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem("userData");
};

type UserDataType = {
  [key: string]: any;
};

type AuthContextType = {
  authData: {
    userData: UserDataType | null;
    accessToken: string;
  };
  loginHandler: (authData: {
    userData: UserDataType;
    accessToken: string;
  }) => void;
  logoutHandler: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authData, setAuthData] = useState({
    userData: getUserDataFromLocalStorage(),
    accessToken: "",
  });

  useEffect(() => {
    const generateNewToken = async () => {
      console.log("new token being generated");
      try {
        const response = await customFetch("/api/auth/refresh", {
          withCredentials: true,
        });
        if (response?.data) {
          setAuthData((prevState) => {
            return {
              ...prevState,
              accessToken: response?.data.accessToken,
            };
          });
        }
      } catch (error) {
        removeUserDataFromLocalStorage();
        setAuthData({ userData: null, accessToken: "" });
      }
    };
    generateNewToken();
  }, []);

  const loginHandler = (authData: any) => {
    const { userData, accessToken } = authData;
    setUserDataToLocalStorage(userData);
    setAuthData({
      userData,
      accessToken,
    });
  };

  const logoutHandler = () => {
    removeUserDataFromLocalStorage();
    setAuthData({
      userData: null,
      accessToken: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }
  return context;
};
