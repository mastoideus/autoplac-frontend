import BasicInput from "../global/BasicInput";
import { Button } from "../ui/button";
import { Link } from "react-router";
import useInput from "@/lib/hooks/useInput";

const MobileLoginForm = () => {
  const {
    inputValue: usernameInputValue,
    inputBlurHandler: usernameBlurHandler,
    inputChangeHandler: usernameChangeHandler,
    isInvalid: usernameIsInvalid,
    validationData: usernameValidationData,
  } = useInput("text");
  const {
    inputValue: passwordInputValue,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    isInvalid: passwordIsInvalid,
    validationData: passwordValidationData,
  } = useInput("password");
  return (
    <form className=" pb-4">
      <div className="flex flex-col gap-y-3">
        <BasicInput
          type="text"
          value={usernameInputValue}
          name="username"
          labelText="korisničko ime"
          className=" border-2 border-gray-300"
          errorMsgClass=" mt-0"
          labelClassName="  uppercase font-semibold"
          isInvalid={usernameIsInvalid}
          onBlur={usernameBlurHandler}
          onChange={usernameChangeHandler}
          errorMessage={usernameValidationData.errorMsg}
        />
        <BasicInput
          type="password"
          name="password"
          value={passwordInputValue}
          className=" border-2 border-gray-300"
          errorMsgClass=" mt-0"
          labelText="lozinka"
          labelClassName=" uppercase font-semibold"
          isInvalid={passwordIsInvalid}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          errorMessage={passwordValidationData.errorMsg}
        />
      </div>
      <div className="mt-3">
        <Button type="submit" className=" w-full bg-blue-900 text-white">
          Prijavi se
        </Button>
      </div>
      <div className=" mt-6">
        <p className=" mb-1 text-gray-400">
          Nemate korisnički račun? Registrujte se
        </p>
        <Button asChild variant="outline" className=" w-full bg-white">
          <Link to="/register">Registracija</Link>
        </Button>
      </div>
    </form>
  );
};

export default MobileLoginForm;
