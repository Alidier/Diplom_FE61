import IconButton from "components/IconButton";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface BookmarkProps {
  value: boolean,
  onClick: () => void,
}
const Bookmark = ({value, onClick}: BookmarkProps) => {
  return (
    <IconButton onClick={onClick}>
      {value ? 
        <BookmarkIcon color="primary" /> :  
        <BookmarkBorderIcon color="primary" />
      }
    </IconButton>
  )
}

export default Bookmark;