  import { activate } from "api/auth";
import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackBarContext } from "shared/contexts";
import { SnackBarType } from "shared/contexts/SnackBarContext";

export const useActivate = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const snackBar = useSnackBarContext();

  return useCallback(async () => {
    try {
      await activate({ uid: String(uid), token: String(token) });
      
      snackBar.addSnackBar('User is activated');
      
      setTimeout(() => {
        navigate('/');
      }, 5000)
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      snackBar.addSnackBar(err.message || 'User is not activated', SnackBarType.Error);
      navigate('/');
    }
  }, [navigate, snackBar, token, uid])
}