import { User } from "api/endpoints/auth";
import Button from "../Button";
import Title from "../ThemeToggleButton/Title";
import styles from "./styles.module.scss";

interface RegistrationConfirmProps {
  user: User,
  goBack: () => void;
}

const RegistrationConfirm = ({ goBack, user }: RegistrationConfirmProps) => {
  return (
    <>
      <Title>We sent mail to your email: {user.email}</Title>
      <h2>{user.email}</h2>
      <div className={styles.content}>
        All Okey
        <Button fullWidth onClick={goBack}>
          Go Back
        </Button>
      </div>
    </>
  );
};

export default RegistrationConfirm;
