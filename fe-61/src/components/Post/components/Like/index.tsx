import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Typography } from '@mui/material';
import IconButton from 'components/IconButton';
import { useSelector } from 'react-redux';
import { getPostCountLikeSelector } from 'api/selectors/posts';
import styles from "./styles.module.scss";
import { useDispatch } from 'react-redux';
import { doLike } from 'api/reducers/posts';

 interface LikeProps {
  postId: number,
 }
 
const Like = ({ postId }: LikeProps) => {
  const dispatch = useDispatch();
  const countLikes = useSelector(getPostCountLikeSelector(postId));

  return (
    <IconButton onClick={() => dispatch(doLike(postId))} className={styles.likebtn} >
      <ThumbUpAltIcon color="primary" />

      {countLikes > 0 && <Typography color="primary">{countLikes}</Typography>}
    </IconButton>
  )
}

export default Like;