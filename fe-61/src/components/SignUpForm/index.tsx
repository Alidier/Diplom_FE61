import { useRef } from "react";
import Button from "../Button";
import Input, { PasswordInput } from "../Input";
import Title from "../ThemeToggleButton/Title";
import styles from "./styles.module.scss";
import { SignUpBody } from "../../api/auth";

interface SignUpFormProps {
  onSuccess?: (body: SignUpBody) => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const EmailRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Form Data:", data);

    if (data.email=== '') {
      EmailRef.current?.focus();
      return 
    }

    onSuccess?.(data as unknown as SignUpBody);
  };

  return (
    <>
      <Title>Sign Up</Title>
      
      <div className={styles.SignUpForm}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="username"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            ref={EmailRef}
          />
          <PasswordInput 
            label="Password" 
            name="password"
          />
          <PasswordInput
            label="Repeat Password"
          />

          <Button type="submit" fullWidth>
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
