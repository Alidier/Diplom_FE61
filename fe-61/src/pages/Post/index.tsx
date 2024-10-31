import Button from "../../components/Button";
import MainPost from "../../components/MainPost";
import { useNavigate } from "react-router-dom";


const PostPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/posts');
  }

  const onBack = () => {
    navigate(-1);
  }

  return (
    <div>
      <Button onClick={onClick}>to posts</Button>
      <Button onClick={onBack} >goBack</Button>

      <hr />
      
      <MainPost />
    </div>
  )
}

export default PostPage;