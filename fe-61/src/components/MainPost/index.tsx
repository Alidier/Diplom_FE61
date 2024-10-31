import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post as IPost } from 'api/endpoints/blog';
import { getPostById } from "../../api/posts";
import Title from "../ThemeToggleButton/Title";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import styles from './styles.module.scss';
import IconButton from "../../components/IconButton";

const MainPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      const newPost = await getPostById(Number(postId));

      setPost(newPost);
      setIsLoading(false);
    } 

    getData();
  }, [postId]);

  return (
    <div>
      {isLoading && <Title>Loading...</Title>}

      {post && (
        <div className={styles.post}>
          <div className={styles.image}>
            <img src={post.image} className={styles.image} alt={post.title} />
          </div>
          
          <div className={styles.title}>
            <Title>{post.title}</Title>

            <div className={styles.features}>
              <IconButton>
                <ThumbUpAltIcon color="primary" />
              </IconButton>
              <IconButton>
                <ThumbDownAltIcon color="primary" />
              </IconButton>
            
                <IconButton>
                  <BookmarkBorderIcon color="primary" />
                </IconButton>

                <IconButton>
                  <MoreHorizIcon color="primary" />
                </IconButton>
            </div>
          </div>

          <div className={styles.body}>
            {post.text}
          </div>

          <div className={styles.footer}>
            <span>
              author: {post.author}
            </span>
            <span>
              posted: {post.date}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPost;