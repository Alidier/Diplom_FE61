import { useEffect } from "react";
import useInput from "shared/hooks/useInput"

interface OrderingProps {
  onChange: (value: string) => void; 
}

const Ordering = ({ onChange }: OrderingProps) => {
  const { value, handleChange } = useInput();

  useEffect(() => {
    onChange(value)
  }, [onChange, value]);

  return (
    <>
      <input type="radio" id='id' value='id' name='ordering' onChange={handleChange} /> 
      <label htmlFor="id">
        ID
      </label>
      <input type="radio" id='Date' value='date' name='ordering' onChange={handleChange} /> 
      <label htmlFor="Date">
        Date
      </label>
      <input type="radio" id='Title' value='title' name='ordering' onChange={handleChange} /> 
      <label htmlFor="Title">
        Title
      </label>
    </>
  )
}

export default Ordering;