import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { hideModal } from "api/reducers/posts";
import { RootState } from "api/store";

const PostModal = () => {
  const post = useSelector((state: RootState) => state.posts.currentPost)
  const isShowModal = useSelector((state: RootState) => state.posts.isShowModal)
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(hideModal());
  }

  if (!post) {
    return null;
  }
  
  return (
    <Dialog open={isShowModal}>
        <DialogContent>
          <Post post={post} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
    </Dialog>
  )
}

export default PostModal;