import React, { useEffect, useState, useRef } from "react";
import Logo from "../navigation/Logo";
import BasicInput from "../global/BasicInput";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import useInput from "@/lib/hooks/useInput";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import customFetch from "@/axios";
import { useAuthContext } from "@/lib/context/authContext";

type FormDataObject = {
  password: string;
  username: string;
};

const LoginForm = () => {
  const { loginHandler } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formErrors, setFormErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const hasShownToast = useRef(false);

  const { mutate } = useMutation({
    mutationFn: (data: FormDataObject) =>
      customFetch.post("/api/auth/login", data, { withCredentials: true }),
    onSuccess: (response) => {
      console.log(response?.data);
      toast.success("Logged in successfully!");
      loginHandler({
        userData: response.data.user,
        accessToken: response.data.accessToken,
      });
      navigate("/");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const verifiedParam = searchParams.get("verified");

    if (verifiedParam && !hasShownToast.current) {
      hasShownToast.current = true;
      setTimeout(() => {
        toast.success("Vaša email adresa je uspješno verifikovana.");
      }, 100);
    }
  }, []);

  const {
    inputValue: usernameValue,
    isInvalid: usernameIsInvalid,
    inputBlurHandler: usernameBlurHandler,
    inputChangeHandler: usernameChangeHandler,
    validationData: usernameValidationData,
  } = useInput("text");

  const {
    inputValue: passwordValue,
    isInvalid: passwordIsInvalid,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    validationData: passwordValidationData,
  } = useInput("password");

  function loginSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (
      !passwordValue ||
      !usernameValue ||
      passwordIsInvalid ||
      usernameIsInvalid
    ) {
      setFormErrors("Sva polja su obavezna");
      return;
    }

    const formDataObj = {
      password: passwordValue,
      username: usernameValue,
    };
    mutate(formDataObj);
  }

  return (
    <>
      <form className=" w-[550px]  " onSubmit={loginSubmitHandler}>
        <div className=" flex items-center justify-center flex-col">
          <Logo bigLogo />
          <h3 className=" uppercase text-gray-600  tracking-wider text-lg text-center mt-3 font-medium">
            Prijava
          </h3>
        </div>
        <div className=" mt-9">
          <BasicInput
            value={usernameValue}
            onBlur={usernameBlurHandler}
            onChange={usernameChangeHandler}
            isInvalid={usernameIsInvalid}
            errorMessage={usernameValidationData?.errorMsg}
            name="username"
            type="text"
            labelText="korisničko ime"
            labelClassName=" font-semibold text-gray-700"
            className=" border-gray-300 h-12 mb-5 "
          />
        </div>
        <BasicInput
          value={passwordValue}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          isInvalid={passwordIsInvalid}
          errorMessage={passwordValidationData?.errorMsg}
          name="password"
          type={showPassword ? "text" : "password"}
          labelText="lozinka"
          labelClassName=" font-semibold text-gray-700"
          className=" h-12  border-none focus-visible:ring-0  "
          insideClassName=" border-[1px] border-gray-300 rounded-md pr-4"
          insideText={
            <>
              {showPassword ? (
                <IoMdEyeOff
                  size={24}
                  className=" text-gray-400"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <IoEye
                  size={24}
                  className=" text-gray-400"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </>
          }
          errorMsgClass=" mt-[1px]"
        />
        {formErrors && <p className=" text-red-600 text-sm">{formErrors}</p>}
        <div className=" my-4">
          <Link to="/">Zaboravljena lozinka?</Link>
        </div>
        <div className=" mb-2">
          <Button className=" w-full h-12 bg-blue-900 text-white">
            Prijava
          </Button>
          <div className=" flex items-center gap-x-2 my-5">
            <Separator className=" flex-1" />
            ili
            <Separator className=" flex-1" />
          </div>

          <Button type="button" className=" w-full h-12 bg-blue-900 text-white">
            <Link to="/register">Registruj se</Link>
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
