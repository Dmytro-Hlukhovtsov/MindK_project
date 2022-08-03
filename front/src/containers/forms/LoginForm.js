import * as Yup from "yup";
import React, { useContext } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useMutation } from "react-query";
import jwtDecode from "jwt-decode";
import GoogleBtn from "../../components/auth/GoogleBtn";
import FacebookBtn from "../../components/auth/FacebookBtn";
import { loginUser } from "../auth/api/authApi";
import authContext from "../../authContext";

const validationSchema = Yup.object({
  signinEmail: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  signinPassword: Yup.string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const LoginForm = ({ setAuth }) => {
  const { context, setContext } = useContext(authContext);
  const login = useMutation("login", (values) => loginUser(values));
  const formik = useFormik({
    initialValues: {
      signinEmail: "",
      signinPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      await login.mutate(
        { ...values },
        {
          onSuccess: ({ data }) => {
            console.log(data);
            setContext({ token: data, user: jwtDecode(data.accessToken) });
            localStorage.setItem("token", JSON.stringify(data));
          },
          onError: (err) => console.log(err),
        }
      );
    },
  });

  return (
    <div className="log-form">
      <form onSubmit={formik.handleSubmit} id="login-form">
        <TextField
          fullWidth
          className="input-block"
          id="signinEmail"
          name="signinEmail"
          placeholder="Email"
          value={formik.values.signinEmail}
          onChange={formik.handleChange}
          error={
            formik.touched.signinEmail && Boolean(formik.errors.signinEmail)
          }
          helperText={formik.touched.signinEmail && formik.errors.signinEmail}
          variant="standard"
        />
        <TextField
          className="input-block"
          fullWidth
          id="signinPassword"
          name="signinPassword"
          placeholder="Password"
          type="password"
          value={formik.values.signinPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.signinPassword &&
            Boolean(formik.errors.signinPassword)
          }
          helperText={
            formik.touched.signinPassword && formik.errors.signinPassword
          }
          variant="standard"
        />

        <Button
          id="signup-btn"
          color="primary"
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </form>
      <div className="auth-footer-block">
        <GoogleBtn setAuth={setAuth} />
        <FacebookBtn setAuth={setAuth} />
      </div>
    </div>
  );
};

export default LoginForm;
