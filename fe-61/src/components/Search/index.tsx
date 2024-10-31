import Button from "components/Button"

import styles from './styles.module.scss'
import useInput from "shared/hooks/useInput"
import { useEffect } from "react"

interface SearchProps {
  onSearch: (search: string) => void
}

const Search = ({ onSearch }: SearchProps) => {
  const { value, handleChange, debouncedValue } = useInput('');

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch])
  
  const onClick = () => {
    onSearch(value);
  }

  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search" onChange={handleChange} />
      <Button onClick={onClick}>Search</Button>
    </div>
  )
}

export default Search;