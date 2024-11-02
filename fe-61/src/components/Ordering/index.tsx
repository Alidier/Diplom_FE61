import { useEffect } from "react";
import useInput from "shared/hooks/useInput";
import styles from "./styles.module.scss"
interface OrderingProps {
  onChange: (value: string) => void;
}

const Ordering = ({ onChange }: OrderingProps) => {
  const { value, handleChange } = useInput('');

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <div>
      <span className={styles.span}>Ordering By:</span>
    <select value={value} onChange={handleChange}>
      <option value="" disabled>Select ordering</option>
      <option value="id">ID</option>
      <option value="date">Date</option>
      <option value="title">Title</option>
    </select>
    </div>
  );
}

export default Ordering;
