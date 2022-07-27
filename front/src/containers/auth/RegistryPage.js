import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../forms/RegisterForm";

const RegisterPage = () => {
  const [auth, setAuth] = useState(true);

  return (
    <div className="log-form-wrapper">
      <RegisterForm setAuth={setAuth} />
      <Link to="/login">I already have account</Link>
    </div>
  );
};

export default RegisterPage;
