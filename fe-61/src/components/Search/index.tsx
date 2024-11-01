import { FC, useEffect } from "react";
import IconButton from "components/IconButton";
import SearchIcon from '@mui/icons-material/Search'; // Импортируем иконку лупы
import styles from './styles.module.scss';
import useInput from "shared/hooks/useInput";

interface SearchProps {
  onSearch: (search: string) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
  const { value, handleChange, debouncedValue } = useInput('');

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);
  
  const onClick = () => {
    onSearch(value);
  }

  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search" onChange={handleChange} />
      <IconButton onClick={onClick} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default Search;
