import { memo } from "react";
import styles from "./styles.module.scss";

export interface ButtonPros {
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string
}

function Button({
  disabled = false,
  children,
  onClick,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  className = '',
}: ButtonPros) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default memo(Button);
