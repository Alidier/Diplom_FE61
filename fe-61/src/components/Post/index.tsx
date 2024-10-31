import { FC, memo, useCallback } from "react";
import { Post as IPost } from 'api/endpoints/blog';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from "./styles.module.scss";
import IconButton from "../IconButton";
import { Link } from "react-router-dom";
import Like from "./components/Like";
import Dislike from "./components/Dislike";
import { useDispatch } from "react-redux";
import Bookmark from "./components/Bookmark";
import { doDislike, updateBookmark } from "api/reducers/posts";

interface PostProps {
  post: IPost;
  size?: "small" | "medium" | "large";
  action?: () => void
}

const Post: FC<PostProps> = ({ post, size = "large", action }) => {
  const dispatch = useDispatch();

  const onBookmark = useCallback(() => {
    dispatch(updateBookmark(post.id));
  }, [dispatch, post.id])

  const onDislike = useCallback(() => {
    dispatch(doDislike(post.id));
  }, [dispatch, post.id]);

  return (
    <div className={`${styles.post} ${styles[size]}`}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <div>{post.date}</div>
          <div className={styles.title}>
            <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
          </div>
          {size === "large" && <div className={styles.text}>{post.text}</div>}

          <div>author: {post.author}</div>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={post.image} />
        </div>
      </div>

      <div className={styles.features}>
        <div>
          <Like postId={post.id} />
          
          <Dislike onClick={onDislike} count={post.dislike} />
        </div>
       
        <div>
          <Bookmark value={post.isFavorite} onClick={onBookmark} />

          <IconButton onClick={() => action?.()}>
            <MoreHorizIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);

