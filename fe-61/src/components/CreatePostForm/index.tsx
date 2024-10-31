import { Box, Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useCreatePostMutation } from "api/endpoints/blog";
import { ImageUploading } from "components/ImageUploading";
import { useState } from "react";

import { useForm } from "react-hook-form";

const CreatePostForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createPost] = useCreatePostMutation()
  
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile); // File input
    }
    formData.append('title', data.title); // Text input
    formData.append('lesson_num', data.lesson_num); 
    formData.append('description', data.description); 
    formData.append('text', data.text); 
    
    try {
      await createPost(formData).unwrap();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  }

  const handleImageChange = (file?: File) => {
    setImageFile(file ?? null);
  };

  
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} width={'100%'} >
          <Grid size={12} >
            <TextField
              fullWidth
              {...register('title', { required: true })}
              label="Title"
              required
            />
          </Grid>
          <Grid size={6} >
            <TextField
              fullWidth
              {...register('lesson_num', { required: true })}
              label="Lesson number"
              required
            />
          </Grid>
          <Grid size={6} >
            <ImageUploading onChange={handleImageChange} />
          </Grid>
          <Grid size={12} >
            <TextField
              fullWidth
              {...register('description', { required: true })}
              label="Description"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid size={12} >
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
        {/* <input {...register('firstName')} />
        <input {...register('lastName', { required: true })} />
        {errors.lastName && <p>Last name is required.</p>}
        <input {...register('age', { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
        <input type="submit" /> */}
      </form>
    </Container>

  )
}

export default CreatePostForm;