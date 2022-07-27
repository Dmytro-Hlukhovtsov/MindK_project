import { useFormik } from "formik";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useMutation } from "react-query";
import { useState } from "react";
import { updatePost, addPost } from "../../containers/forms/api/formsApi";
import PostImageUpload from "../../containers/forms/postImageUpload";
import FormikAutoComplete from "../formik/FormikAutoComplete";

const validationSchema = yup.object({
  text: yup.string().min(10, "Длина текста должна быть не менее 10 символов"),
});
const options = [
  { value: 1, label: "All people" },
  { value: 2, label: "My fans" },
  { value: 3, label: "My folowers" },
];
const PostForm = ({ post = null }) => {
  // eslint-disable-next-line no-unused-vars

  const [postImage, setPostImage] = useState(null);

  const handleSetPostImage = (image) => {
    setPostImage(image);
  };

  const addingPost = useMutation("addPost", (values) => addPost(values));
  const updatingPost = useMutation("updatePost", (values) =>
    updatePost(values)
  );

  const formik = useFormik({
    initialValues: post
      ? {
          text: post.text,
          commentable: post.commentable,
          type: "post",
          oldLink: post.link,
          link: post.link,
          changed: true,
        }
      : {
          text: "",
          commentable: true,
          type: "post",
          user_id: 1,
        },
    validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-unused-expressions
      post
        ? updatingPost.mutate({
            ...values,
            link: postImage,
            post_id: post.post_id,
          })
        : addingPost.mutate({
            ...values,
            link: postImage,
          });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="text"
        name="text"
        label="Введите текст поста"
        multiline
        rows={4}
        value={formik.values.text}
        onChange={formik.handleChange}
        error={formik.touched.text && Boolean(formik.errors.text)}
        helperText={formik.touched.text && formik.errors.text}
      />

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              id="commentable"
              name="commentable"
              checked={formik.values.commentable}
              onChange={formik.handleChange}
            />
          }
          label="Возможность комментировать"
        />
      </FormGroup>
      <PostImageUpload handlePostImage={handleSetPostImage} />
      <FormikAutoComplete
        name="visibility"
        options={options}
        optionNumber={post ? post.visibility : null}
        sx={{ width: 300 }}
        onChange={formik.setFieldValue}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};

export default PostForm;
