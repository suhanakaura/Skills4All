import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../services/service.jsx";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  
  
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);
  const [user, setUser] = useState(null);
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    
  });
  const validateSignupInfo = () => {
    
    if (
      !signupInfo.username ||
      !signupInfo.email ||
      !signupInfo.password ||
      !signupInfo.passwordConfirm 
    ) {
      setSignupError("Please fill in all required fields.");
      return false;
    }

    if (signupInfo.password !== signupInfo.passwordConfirm) {
      setSignupError("Passwords do not match.");
      return false;
    }

    return true;
  };
  const submitSignup = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateSignupInfo()) return;
      try {
        const response = await postRequest(
          "auth/signup",
          JSON.stringify(signupInfo)
        );
        if (response.error) {
          setSignupError(response.message);
        } else {
          // localStorage.setItem("user", JSON.stringify(response));
          setUser(response);
    
            navigate("/")
          
        }
      } catch (error) {
        setSignupError(error.message || "An unexpected error occurred.");
      }
    },
    [signupInfo]
  );
  
  
  const [loginError, setLoginError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const submitLogin = useCallback(
    async (e) => {
      e.preventDefault();

      
      if (!loginInfo.username || !loginInfo.password) {
        setLoginError("All fields are required.");
        return;
      }

      try {
        const response = await postRequest(
          "auth/login",
          JSON.stringify(loginInfo)
        );
        console.log(response);

        if (response.error) {
          setLoginError(response.message);
        } else {
    
            navigate("/")
    
          localStorage.setItem("user", JSON.stringify(response));
          setUser(response);
        }
      } catch (err) {
        setLoginError(err.message || "An unexpected error occurred.");
      }
    },
    [loginInfo,navigate]
  );

  const [logoutError, setLogoutError] = useState(null);
  const submitLogout = async () => {
    const response = await postRequest("auth/logout");
    console.log(response)
    if (response.error) {
      setLogoutError(response);
    } else {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/Login");
    }
  };

 
  return (
    <AuthContext.Provider
      value={{
        signupInfo,
        setSignupInfo,
        signupError,
        submitSignup,
        loginInfo,
        setLoginInfo,
        loginError,
        user,
        submitLogin,
        submitLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
