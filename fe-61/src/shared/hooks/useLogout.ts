import { useNavigate } from "react-router-dom"
import { useAppContext } from "shared/contexts";

export const useLogOut = () => {
  const navigate = useNavigate();
  const { clearToken } = useAppContext();
  
  return () => {
    clearToken()
    navigate('/');
  }
}


