import { useState } from "react";
import SignUpForm from "../../components/SignUpForm";
import RegistrationConfirm from "../../components/RegistrationConfirm";
import { SignUpBody, User, signUp } from "api/auth";

const SignUp = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSuccess = async (data: SignUpBody) => {
    try {
      const user = await signUp(data)
    
      setUser(user);
      setIsSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onGoBack = () => {
    setIsSuccess(false);
  };

  if (isSuccess && user) {
    return <RegistrationConfirm goBack={onGoBack} user={user} />;
  }

  return <SignUpForm onSuccess={onSuccess} />;
};

export default SignUp;
