import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [auth, setAuth] = useState(true);

  return (
    <div className="log-form-wrapper">
      <LoginForm setAuth={setAuth} />
      <Link to="/registry">I already have account</Link>
    </div>
  );
};

export default LoginPage;
