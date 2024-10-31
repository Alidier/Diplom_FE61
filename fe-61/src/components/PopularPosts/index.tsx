import Post from "components/Post";
import { useSelector } from "react-redux";
import { favoritesPostsSelector, allPopularPostsSelector } from "api/selectors/posts";
import styles from "./styles.module.scss";

const PopularPosts: React.FC = () => {
    const popularPosts = useSelector(allPopularPostsSelector);
    console.log(popularPosts);
    return (
    <div className={styles.container}>
        {popularPosts.length > 0 ? (
            
            popularPosts.map(post => (
                
                <Post key = {post.id} post = {post} />
            ))
        ) : 
        (
            <p>No popular posts found.</p>
        )}
    </div>
    )
}

export default PopularPosts;