import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useMutation } from "react-query";
import jwtDecode from "jwt-decode";
import GoogleBtn from "../../components/auth/GoogleBtn";
import FacebookBtn from "../../components/auth/FacebookBtn";
import { registerUser } from "../auth/api/authApi";
import authContext from "../../authContext";

const validationSchema = Yup.object({
  username: Yup.string("Enter your username").min(
    6,
    "Username should be of minimun 6 characters length"
  ),
  signupEmail: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  signupPassword: Yup.string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  repeatPassword: Yup.string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required")
    .oneOf([Yup.ref("signupPassword"), null], "Passwords must match"),
});

const RegisterForm = ({ setAuth }) => {
  const { context, setContext } = useContext(authContext);

  const registry = useMutation("registry", (values) => registerUser(values));
  const formik = useFormik({
    initialValues: {
      username: "",
      signupEmail: "",
      signupPassword: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await registry.mutate(
        { ...values },
        {
          onSuccess: ({ data }) => {
            setContext({ token: data, user: jwtDecode(data.accessToken) });
            localStorage.setItem("token", JSON.stringify(data));
          },
        }
      );
    },
  });

  return (
    <div className="log-form">
      <form onSubmit={formik.handleSubmit} id="register-form">
        <TextField
          fullWidth
          className="input-block"
          id="username"
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          variant="standard"
        />
        <TextField
          fullWidth
          className="input-block"
          id="signupEmail"
          name="signupEmail"
          placeholder="Email"
          value={formik.values.signupEmail}
          onChange={formik.handleChange}
          error={
            formik.touched.signupEmail && Boolean(formik.errors.signupEmail)
          }
          helperText={formik.touched.signupEmail && formik.errors.signupEmail}
          variant="standard"
        />
        <TextField
          className="input-block"
          fullWidth
          id="signupPassword"
          name="signupPassword"
          placeholder="Password"
          type="password"
          value={formik.values.signupPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.signupPassword &&
            Boolean(formik.errors.signupPassword)
          }
          helperText={
            formik.touched.signupPassword && formik.errors.signupPassword
          }
          variant="standard"
        />
        <TextField
          className="input-block"
          fullWidth
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.repeatPassword &&
            Boolean(formik.errors.repeatPassword)
          }
          helperText={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
          placeholder="Repeat your password"
          variant="standard"
        />
        <Button
          id="signup-btn"
          color="primary"
          variant="contained"
          type="submit"
        >
          Register
        </Button>
      </form>
      <div className="auth-footer-block">
        <div className="auth-footer-block">
          <GoogleBtn setAuth={setAuth} />
          <FacebookBtn setAuth={setAuth} />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
