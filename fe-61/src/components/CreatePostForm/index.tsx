import { Box, Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useCreatePostMutation } from "api/endpoints/blog";
import { ImageUploading } from "components/ImageUploading";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "shared/contexts";
import styles from "./styles.module.scss";

const CreatePostForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createPost] = useCreatePostMutation();

  const { register, handleSubmit } = useForm();
  const { theme } = useAppContext();

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('title', data.title);
    formData.append('lesson_num', data.lesson_num);
    formData.append('description', data.description);
    formData.append('text', data.text);

    try {
      await createPost(formData).unwrap();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleImageChange = (file?: File) => {
    setImageFile(file ?? null);
  };

  return (
    <Container className={theme === "dark" ? styles.darkTheme : styles.lightTheme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} width={'100%'}>
          <Grid size={12}>
            <TextField
              fullWidth
              {...register('title', { required: true })}
              label="Title"
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              {...register('lesson_num', { required: true })}
              label="Lesson number"
              required
            />
          </Grid>
          <Grid size={6}>
            <ImageUploading onChange={handleImageChange} />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              {...register('description', { required: true })}
              label="Description"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              {...register('text', { required: true })}
              label="Text"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid size={12}>
            <Box display={'flex'} gap={2} justifyContent={'flex-end'}>
              <Button type="submit" variant="outlined">Cancel</Button>
              <Button type="submit" variant="contained">Create Post</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreatePostForm;
