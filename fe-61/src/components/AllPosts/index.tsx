import { useCallback, useMemo, useState } from 'react';
import { Post as IPost } from 'api/endpoints/blog';
import styles from "./styles.module.scss";
import { useDispatch } from 'react-redux';
import { showCurrentPost } from 'api/reducers/posts';
import Post from 'components/Post';
import { useGetAllPosts } from 'api/hooksApi/useGetAllPosts';
import Search from 'components/Search';
import Ordering from 'components/Ordering';
import { TablePagination } from '@mui/material';
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
  
  const mediumPostList = useMemo(() => posts.slice(1, 5), [posts]);
  console.log(posts);

  const smallPostList = useMemo(() => posts.slice(5), [posts]);

  return (
    <div>
      <div className={styles.block}>
        <Search onSearch={setSearch}/>
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
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
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
        <div className={styles.mainColumn}>
          {posts[0] && <Post post={posts[0]}  action={onPostClick(posts[0])} />}
          <div className={styles.mediumPosts}>
            {mediumPostList.map((post: IPost) => {
              return <Post key={post.id} post={post} size="medium" action={onPostClick(post)} />;
            })}
          </div>
        </div>
        <div className={styles.saidColumn}>
          {smallPostList.map((post: IPost) => {
            return <Post key={post.id} post={post} size="small" action={onPostClick(post)} />;
          })}
        </div> 
      </div>
    </div>

  )
}

export default AllPosts;
