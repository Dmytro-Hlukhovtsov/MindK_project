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
import { updatePost, addPost } from "../../containers/forms/api/formsApi";

const validationSchema = yup.object({
  text: yup.string().min(10, "Длина текста должна быть не менее 10 символов"),
});

const AddPost = ({ post = null }) => {
  const addingPost = useMutation("addPost", (values) => addPost(values));
  const updatingPost = useMutation("updatePost", (values) =>
    updatePost(values)
  );

  const formik = useFormik({
    initialValues: post
      ? {
          text: post.text,
          commentable: post.commentable,
        }
      : {
          text: "",
          commentable: true,
        },
    validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-unused-expressions
      post
        ? updatingPost.mutate({ ...values, post_id: post.post_id })
        : addingPost.mutate({
            ...values,
            visibility: 1,
            link: null,
            created_time: new Date(),
            user_id: 1,
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
              defaultChecked
              id="commentable"
              name="commentable"
              value={formik.values.commentable}
              onChange={formik.handleChange}
            />
          }
          label="Возможность комментировать"
        />
      </FormGroup>

      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddPost;
