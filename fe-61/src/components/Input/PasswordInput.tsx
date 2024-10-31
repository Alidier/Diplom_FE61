import { useState } from "react";
import Input, { InputProps } from "./BaseInput";
import IconButton from "components/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';

import styles from './styles.module.scss'

type PasswordInputProps = Omit<InputProps, 'Action'>

export const PasswordInput = (props: PasswordInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggle = () => {
    setIsShowPassword(prev => !prev)
  }

  return (
    <div className={styles.passwordInput}>
      <Input 
        {...props} 
        type={isShowPassword ? 'text' : 'password'} 
        className={styles.passwordInput}
        Action={
          <IconButton
            className={styles.showButton}
            type="button" 
            onClick={toggle}>
              <VisibilityIcon />
          </IconButton>
        }
      />
    </div>
    
  )
} 