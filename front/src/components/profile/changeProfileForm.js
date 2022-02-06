import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import { updateUserProfile } from "../../containers/forms/api/formsApi";

const validationSchema = yup.object({
  username: yup.string("Enter your Username").min(5, "Enter minimum 5 symbols"),
  name: yup.string("Enter your name"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string("Enter yor phone")
    .max(13, "Phone number must contain 13 symbols"),
});

const ChangeProfileForm = ({ user }) => {
  const updateProfile = useMutation("updateProfile", (values) =>
    updateUserProfile(user.user_id, values)
  );
  const formik = useFormik({
    initialValues: {
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    validationSchema,
    onSubmit: (values) => {
      updateProfile.mutate(values);
    },
  });
  console.log(formik);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ChangeProfileForm;
