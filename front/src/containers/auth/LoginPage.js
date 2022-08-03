import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";

const LoginPage = () => (
  <div className="log-form-wrapper">
    <LoginForm />
    <Link to="/registry">Create new account</Link>
  </div>
);

export default LoginPage;
