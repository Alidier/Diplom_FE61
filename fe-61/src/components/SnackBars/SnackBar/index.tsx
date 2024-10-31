import { useSnackBarContext } from "shared/contexts";
import styles from "./styles.module.scss";

interface SnackBarProps {
  id: number,
  type: 'Error' | 'Ok',
  message: string,
}

export const SnackBar = ({ id, type, message }: SnackBarProps) => {
  const { onClose } = useSnackBarContext();

  const classNames = [styles['snack-bar'], styles[`snack-bar--${type}`]].join(' ');

  return (
    <div className={classNames}>
      <p>
        {message}
      </p>

      <button onClick={() => onClose(id)}>X</button>
    </div>
  )
}