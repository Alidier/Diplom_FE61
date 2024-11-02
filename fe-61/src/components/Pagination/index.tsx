import { useAppContext } from "shared/contexts";
import Button from "components/Button";
import useInput from "shared/hooks/useInput";
import styles from "./styles.module.scss";

interface PaginationProps {
  count: number;
  offset: number;
  onOffsetChnage: (offset: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Pagination = (props: PaginationProps) => {
  const { theme } = useAppContext(); 
  const { value: rowsPerPage, handleChange } = useInput(String(props.rowsPerPage));

  const handleRowsPerPageChange = (event) => {
    handleChange(event);
    props.onRowsPerPageChange(event);
  };

  const onPrev = () => {
    let newOffset = props.offset - props.rowsPerPage;
    if (newOffset < 0) {
      newOffset = 0;
    }
    props.onOffsetChnage(newOffset);
  };

  const onNext = () => {
    const maxOffset = Math.min(30, props.count) - props.rowsPerPage;
    const newOffset = Math.min(props.offset + props.rowsPerPage, maxOffset);

    props.onOffsetChnage(newOffset);
  };

  return (
    <div className={theme === "dark" ? styles.paginationDark : styles.paginationLight}>
      <div className={styles.rowControl}>
        <span className={styles.SelectSpan}>Rows per page:</span>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
      </div>

      <div className={styles.navigation}>
        <Button onClick={onPrev} disabled={props.offset === 0}>Prev</Button>
        <span className={styles.navigation__element}>{props.offset + 1} - {Math.min(props.offset + props.rowsPerPage, 30)} of {Math.min(30, props.count)} </span>
        <Button onClick={onNext} disabled={props.offset + props.rowsPerPage >= Math.min(30, props.count)}>Next</Button>
      </div>
    </div>
  );
};

export default Pagination;
