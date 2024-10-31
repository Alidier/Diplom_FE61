import { useEffect, useState } from "react";
import Title from "../../components/ThemeToggleButton/Title";
import PostModal from "../../components/PostModal";

import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import Tabs from "components/Tabs";
import AllPosts from "components/AllPosts";
import MyFavoritesPosts from "components/MyFavoritesPosts";
import { loadPosts } from "api/reducers/posts";
import { getAllPosts } from "api/posts";
import PopularPosts from "components/PopularPosts"

const tabs = [
  {
    id: 1,
    label: "All Posts",
  },
  {
    id: 2,
    label: "My Favorites",
  },
  {
    id: 3,
    label: "Popular",
  },
];

const Posts = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState(1);

  useEffect(() => {
    const getList = async () => {
      const newList = await getAllPosts();

      dispatch(loadPosts(newList))
      setLoading(false);
    };

    getList();
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Title>Posts</Title>
    
      <Tabs tabs={tabs} onChangeTab={setCurrentTab} />

      {loading && <Title>Loading.......</Title>}

      {!loading && currentTab === 1 && (
        <AllPosts />
      )}

      {!loading && currentTab === 2 && (
        <MyFavoritesPosts />
      )}

      {!loading && currentTab === 3 && (
        <PopularPosts />
      )}

      <PostModal />
    </div>
  );
};

export default Posts;
