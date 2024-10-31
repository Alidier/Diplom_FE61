import Button from "components/Button";
import { useState } from "react";
import useInput from "shared/hooks/useInput";

interface PaginationProps {
  count: number,
  offset: number,
  onOffsetChnage: (offset: number) => void,
  rowsPerPage: number,
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Pagination = (props: PaginationProps) => {
  const {value: rowsPerPage, handleChange} = useInput(String(props.rowsPerPage));

  const handleRowsPerPageChange = (event) => {
    handleChange(event);

    props.onRowsPerPageChange(event)    
  }

  const onPrev = () => {
    let newOffset = props.offset - props.rowsPerPage - 1;

    if (newOffset < 0) {
      newOffset = 0;
    }

    props.onOffsetChnage(newOffset);
  }

  const onNext = () => {
    const newOffset = props.offset + props.rowsPerPage + 1;

    props.onOffsetChnage(newOffset)
  }

  return (
    <div>
      <div>
        Rows per page: 
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div>
        <Button onClick={onPrev}>prev</Button>
        {props.offset} - {props.offset + props.rowsPerPage} of {props.count}
        <Button onClick={onNext}>next</Button>
      </div>
    </div>
  )
}

export default Pagination;