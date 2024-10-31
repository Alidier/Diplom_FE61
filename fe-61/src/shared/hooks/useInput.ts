import { useState } from "react";
import useDebounce from "./useDebounce";

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const debouncedValue = useDebounce<string>(value)

  const handleChange = (event: { target: { value: string } }) => {
    setValue(event.target.value);
  }
  
  return { value, setValue, handleChange, debouncedValue }
};

export default useInput;