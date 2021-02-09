import { useState, useCallback } from "react";
//Чёрт побери эту долбанную валидацию полей !!!!!!!!!!!!!!!АААААААААА!!!!!!!!

export const useFormWithValidation = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);

  const onChange = useCallback((evt) => {
    setValue(evt.target.value);
    setErrorMessage(evt.target.validationMessage);
    setIsValid(evt.target.validity.valid);
  }, []);

  return {
    value,
    setValue,
    errorMessage,
    setErrorMessage,
    isValid,
    setIsValid,
    onChange,
  };
};
