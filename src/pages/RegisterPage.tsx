import React from "react";
import RegisterForm from "@/components/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className=" bg-gray-50">
      <div className=" page_layout bg-white flex justify-center items-center pt-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
