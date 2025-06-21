import React from "react";
import LoginForm from "@/components/register/LoginForm";

const LoginPage = () => {
  return (
    <div className=" bg-gray-50">
      <div className=" page_layout bg-white flex justify-center items-center pt-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
