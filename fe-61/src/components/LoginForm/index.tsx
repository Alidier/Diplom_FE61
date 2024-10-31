import Input, { PasswordInput } from "components/Input";
import Title from "components/ThemeToggleButton/Title";
import useLogin from "shared/hooks/useLogin";

import styles from './styles.module.scss';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { LoginArgs } from "api/auth";

const LoginForm = () => {
  const login = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    login(data as unknown as LoginArgs);
  };

  return (
    <div className={styles.LoginForm}>
      <Title>Login</Title>
      
      <div >
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
          />
          <PasswordInput 
            label="Password" 
            name="password"
            type="password"
          />

          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
        <Link to={'/sign-up'}>Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginForm;