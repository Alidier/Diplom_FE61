import { SnackBar } from "./SnackBar";
import { useSnackBarContext } from "shared/contexts";

import styles from "./styles.module.scss";


const SnackBars = () => {
  const { items } = useSnackBarContext();

  return (
    <div className={styles['snack-bars']}>
      {items.map((item) => (
       <SnackBar key={item.id} id={item.id} type={item.type as 'Error' | 'Ok' } message={item.message} />
      ))}
    </div>
  )
}

export default SnackBars;


