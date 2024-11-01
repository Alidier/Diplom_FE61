import { useCallback, useMemo, useState } from 'react';
import { Post as IPost } from 'api/endpoints/blog';
import styles from "./styles.module.scss";
import { useDispatch } from 'react-redux';
import { showCurrentPost } from 'api/reducers/posts';
import Post from 'components/Post';
import { useGetAllPosts } from 'api/hooksApi/useGetAllPosts';
import Search from 'components/Search';
import Ordering from 'components/Ordering';
import Pagination from 'components/Pagination';
import { Link } from 'react-router-dom';

const AllPosts = () => {
  const dispatch = useDispatch();

  const [ordering, setOrdering] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { posts, count } = useGetAllPosts({ search, ordering, limit: rowsPerPage, offset });

  const onPostClick = useCallback((post: IPost) => 
    () => {
      dispatch(showCurrentPost(post));
  }, [dispatch]);
  
  return (
    <div>
      <div className={styles.block}>
        <Search onSearch={setSearch} />
      </div>
      <div className={styles.block}>
       <Ordering onChange={setOrdering} />
      </div>
      <div className={styles.block}>
        <Pagination  
          count={count}
          offset={offset}
          onOffsetChnage={setOffset}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage} 
        />
      </div>

      <div>
        <Link to={'/posts/create'}>
          Create
        </Link>
      </div>

      <div className={styles.container}>
        {posts.map((post: IPost, index: number) => (
          <Post
            key={post.id}
            post={post}
            size={index % 2 === 0 ? "medium" : "small"}
            action={onPostClick(post)}
          />
        ))}
      </div>
    </div>
  )
}

export default AllPosts;
