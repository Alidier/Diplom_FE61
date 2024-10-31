  import { LoginArgs, login } from "api/auth";
  import { useLazyGetMeQuery } from "api/endpoints/user";
  import { useCallback } from "react";
  import { useAppContext, useSnackBarContext } from "shared/contexts";
  import { SnackBarType } from "shared/contexts/SnackBarContext";

  const validation = (data: LoginArgs) => {
    if (data.email === '') {
      throw new Error('Email is empty');
    }

    if (data.password === '' || data.password.length < 8) {
      throw new Error('Password is not valid');
    }
  } 

  const useLogin = () => {
    const { saveUserToken } = useAppContext();
    const snackBar = useSnackBarContext();
    const [trigger] = useLazyGetMeQuery();

    return useCallback(async (body: LoginArgs) => {
      try {
        validation(body);
      
        const loginData = await login(body)
        
        if (!loginData) {
          throw new Error('Faild login')
        }

        await trigger();

        saveUserToken(loginData);
        snackBar.addSnackBar('User is login');
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        snackBar.addSnackBar(error?.message || 'An error occurred', SnackBarType.Error);
      }
    }, [saveUserToken, snackBar, trigger])
  }

  export default useLogin;