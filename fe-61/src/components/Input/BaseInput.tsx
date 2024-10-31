import { ChangeEvent, ReactNode, forwardRef, useState } from "react";
import styles from "./styles.module.scss";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "email" | "number";
  disabled?: boolean;
  error?: string;
  name?: string;
  Action?: ReactNode; 
  className?: string; 
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      type = "text",
      disabled = false,
      name,
      error,
      Action,
      className,
    },
    ref
  ) => {
    const [val, setVal] = useState(value ?? "");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setVal(e.target.value);
      onChange?.(e.target.value);
    };

    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.inputLabel}>{label}</label>}
        <input
          className={`${styles.inputField} ${error ? styles.inputError : ""} ${className}`}
          type={type}
          placeholder={placeholder}
          value={val}
          name={name}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
        />
        {Action && Action}
        {error && <span className={styles.inputErrorMessage}>{error}</span>}
      </div>
    );
  }
);

export default Input;
