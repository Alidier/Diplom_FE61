import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Typography } from '@mui/material';
import IconButton from 'components/IconButton';
import styles from "./styles.module.scss";

 interface DislikeProps {
  count: number,
  onClick?: () => void,
 }
 
const Dislike = ({ count, onClick  }: DislikeProps) => {
  return (
    <IconButton onClick={() => onClick?.()} className={styles.likebtn} >
      <ThumbDownAltIcon color="primary" />

      {count > 0 && <Typography color="primary">{count}</Typography>}
    </IconButton>
  )
}

export default Dislike;