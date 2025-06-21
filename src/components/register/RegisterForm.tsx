import React, { useState } from "react";
import Logo from "../navigation/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInput from "../global/BasicInput";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Separator } from "../ui/separator";
import useInput from "@/lib/hooks/useInput";
import { useMutation } from "@tanstack/react-query";
import customFetch from "@/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Spinner from "../global/LoadingSpinner.tsx";

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState({
    inputErrors: false,
    passwordConfirmationError: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmedPassword: false,
  });
  const {
    inputValue: emailValue,
    isInvalid: emailIsInvalid,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    validationData: emailValidationData,
  } = useInput("email");

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

  const {
    inputValue: confirmedPasswordValue,
    isInvalid: confirmedPasswordIsInvalid,
    inputBlurHandler: confirmedPasswordBlurHandler,
    inputChangeHandler: confirmedPasswordChangeHandler,
    validationData: confirmedPasswordValidationData,
  } = useInput("password");

  function handleShowPassword(passwordName: "password" | "confirmedPassword") {
    setShowPasswords((prevState) => ({
      ...prevState,
      [passwordName]: !prevState[passwordName],
    }));
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterData) =>
      customFetch.post("/api/auth/register", data),
    onSuccess: (response) => {
      console.log(response?.data.data.username);
      const username = response?.data.data.username;
      toast(
        `Korisnik ${username} je registrovan. Da bi ste se prijavili verifikujte email adresu.`
      );
      navigate("/");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  function submitRegisterForm(e: React.FormEvent) {
    e.preventDefault();
    if (
      [
        usernameIsInvalid,
        passwordIsInvalid,
        emailIsInvalid,
        confirmedPasswordIsInvalid,
      ].some((invalidInput) => invalidInput) ||
      [usernameValue, passwordValue, emailValue, confirmedPasswordValue].some(
        (value) => !value && value === ""
      )
    ) {
      setFormError((prevState) => ({ ...prevState, inputErrors: true }));
      setTimeout(() => {
        setFormError({ inputErrors: false, passwordConfirmationError: false });
      }, 2000);
      return;
    }
    if (passwordValue !== confirmedPasswordValue) {
      setFormError((prevState) => ({
        ...prevState,
        passwordConfirmationError: true,
      }));
      setTimeout(() => {
        setFormError({ inputErrors: false, passwordConfirmationError: false });
      }, 2000);
      return;
    }
    const formDataObj = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    };
    mutate(formDataObj);
  }

  return (
    <form className=" w-[550px] " onSubmit={submitRegisterForm}>
      <div className=" flex items-center justify-center flex-col">
        <Logo bigLogo />
        <h3 className=" uppercase text-gray-700  tracking-wider text-lg text-center mt-3 font-medium">
          Registracija
        </h3>
      </div>
      <div className=" w-full mt-10">
        <Tabs defaultValue="private" className=" w-full   ">
          <TabsList className=" w-full flex bg-transparent  ">
            <TabsTrigger
              value="private"
              className=" text-md flex-1 rounded-none transition-all duration-300 pb-4 border-b-2 border-transparent  data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-gray-900"
            >
              Fizičko lice
            </TabsTrigger>
            <TabsTrigger
              value="company"
              className=" text-md flex-1 rounded-none transition-all duration-300 pb-4 border-b-2 border-transparent  data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-gray-900"
            >
              Pravno lice
            </TabsTrigger>
          </TabsList>
          <TabsContent value="private" className=" mt-14">
            <BasicInput
              value={emailValue}
              onBlur={emailBlurHandler}
              onChange={emailChangeHandler}
              isInvalid={emailIsInvalid}
              errorMessage={emailValidationData?.errorMsg}
              name="email"
              type="email"
              labelText="email"
              className=" border-gray-300 h-12 mb-5 "
              labelClassName=" font-semibold text-gray-700"
            />
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
            <div className=" flex items-start gap-x-4  ">
              <div className=" flex-1">
                <BasicInput
                  value={passwordValue}
                  onBlur={passwordBlurHandler}
                  onChange={passwordChangeHandler}
                  isInvalid={passwordIsInvalid}
                  errorMessage={passwordValidationData?.errorMsg}
                  name="password"
                  type={showPasswords.password ? "text" : "password"}
                  labelText="lozinka"
                  labelClassName=" font-semibold text-gray-700"
                  className=" h-12  border-none focus-visible:ring-0  "
                  insideClassName=" border-[1px] border-gray-300 rounded-md pr-4"
                  insideText={
                    <>
                      {showPasswords.password ? (
                        <IoMdEyeOff
                          size={24}
                          className=" text-gray-400"
                          onClick={() => handleShowPassword("password")}
                        />
                      ) : (
                        <IoEye
                          size={24}
                          className=" text-gray-400"
                          onClick={() => handleShowPassword("password")}
                        />
                      )}
                    </>
                  }
                  errorMsgClass=" mt-[1px]"
                />
              </div>
              <div className="flex-1">
                <BasicInput
                  value={confirmedPasswordValue}
                  onBlur={confirmedPasswordBlurHandler}
                  onChange={confirmedPasswordChangeHandler}
                  isInvalid={confirmedPasswordIsInvalid}
                  errorMessage={confirmedPasswordValidationData?.errorMsg}
                  className="h-12 border-none focus-visible:ring-0 "
                  name="repeat_password"
                  type={showPasswords.confirmedPassword ? "text" : "password"}
                  labelText="ponovi lozinku"
                  labelClassName=" font-semibold text-gray-700"
                  insideClassName=" border-[1px] border-gray-300 rounded-md pr-4"
                  insideText={
                    <>
                      {showPasswords.confirmedPassword ? (
                        <IoMdEyeOff
                          size={24}
                          className=" text-gray-400"
                          onClick={() =>
                            handleShowPassword("confirmedPassword")
                          }
                        />
                      ) : (
                        <IoEye
                          size={24}
                          className=" text-gray-400"
                          onClick={() =>
                            handleShowPassword("confirmedPassword")
                          }
                        />
                      )}
                    </>
                  }
                  errorMsgClass=" mt-[1px]"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="company" className=" mt-14"></TabsContent>
        </Tabs>
        <div className=" my-2">
          {formError.inputErrors && (
            <p className=" text-red-600 text-sm">Sva polja su obavezna</p>
          )}
          {formError.passwordConfirmationError && (
            <p className=" text-red-600 text-sm">Lozinke se ne podudaraju</p>
          )}
        </div>
        <p className=" my-10 text-justify  text-[0.95rem] text-gray-500">
          Klikom na dugme ispod, slažete se i pročitali ste naše Opće odredbe i
          uslove i politiku privatnosti. Za više detalja o tome kako koristimo
          informacije koje prikupljamo o vama, pročitajte našu Vista politiku
          privatnosti i kolačića.
        </p>
        <div className=" mb-2">
          <Button className=" w-full h-12 bg-blue-900 text-white">
            {isPending ? <Spinner /> : "Registruj se"}
          </Button>
          <div className=" flex items-center gap-x-2 my-5">
            <Separator className=" flex-1" />
            ili
            <Separator className=" flex-1" />
          </div>

          <Button className=" w-full h-12 bg-blue-900 text-white">
            <Link to="/login">Idi na prijavu</Link>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
