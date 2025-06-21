import React, { useState } from "react";

function validateInput(type: string, value: string) {
  let isValid = true;
  let errorMsg = "";

  if (value === "") {
    isValid = false;
    errorMsg = "Polje je obavezno";

    return {
      isValid,
      errorMsg,
    };
  }

  switch (type) {
    case "email":
      if (value !== "" && !value.includes("@")) {
        isValid = false;
        errorMsg = "Nepravilan format";
      }
      break;
    case "password":
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      if (!passwordRegex.test(value)) {
        isValid = false;
        errorMsg =
          "Lozinka treba sadržavati najmanje 8 znakova, jedno veliko slovo, cifru i posebni znak";
      }
      break;
    default:
      break;
  }

  return {
    isValid,
    errorMsg,
  };
}

const useInput = (type: string) => {
  const [inputValue, setInputValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const validationData = validateInput(type, inputValue);
  const isInvalid = inputIsTouched && !validationData?.isValid;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input changed");
    setInputValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };
  return {
    inputValue,
    isInvalid,
    inputChangeHandler,
    inputBlurHandler,
    validationData,
  };
};

export default useInput;
