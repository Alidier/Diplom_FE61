import Post from "components/Post";
import { useSelector } from "react-redux";
import { favoritesPostsSelector } from "api/selectors/posts";
import styles from "./styles.module.scss";

const MyFavoritesPosts = () => {
  const posts = useSelector(favoritesPostsSelector);

  return (
    <div className={styles.container}>
      {posts.map(post => {
        return (
          <Post key={post.id} post={post} />
        )
      })}
    </div>
  )
}

export default MyFavoritesPosts;