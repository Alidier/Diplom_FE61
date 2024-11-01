import CreatePostForm from "components/CreatePostForm";
import Title from "components/ThemeToggleButton/Title";
import styles from "./styles.module.scss"
import { useAppContext } from "shared/contexts";

const CreatePost = () => {
  const {theme} = useAppContext();
  return (  
    <div className={theme === "dark" ? styles.darkTheme : styles.lightTheme}>
      <Title>Create Post</Title>

      <div >
        <CreatePostForm />
      </div>
    </div>
  )
}

export default CreatePost;