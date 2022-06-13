import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormInput } from "../components";
import { useAuth } from "../context";
import { loginHandler } from "../utils/services/";
import { routes, testCredentials } from "../constants";
import { useDynamicTitle } from "../hooks";

const LoginPage = () => {
  useDynamicTitle();
  const [{ email, password }, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setLoginCredentials((loginCredentials) => ({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const navigate = useNavigate();
  const { authDispatch } = useAuth();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    loginHandler({ email, password }, authDispatch, navigate);
  };

  return (
    <main className="card mw-28r p-1 my-3-5 mx-auto">
      <h1 className="center-text my-0-5">Login</h1>
      <div className="m-1">
        <form onSubmit={handleLoginSubmit}>
          <FormInput
            label="Email"
            type="email"
            value={email}
            name="email"
            changeHandler={handleInputChange}
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            name="password"
            changeHandler={handleInputChange}
          />

          <button
            type="button"
            className="btn btn-outline-primary w-100p my-0-25 mt-1 text-bold-weight"
            onClick={() => setLoginCredentials(testCredentials)}
          >
            Fill Test Credentials
          </button>

          <button
            type="submit"
            className="btn btn-solid-primary w-100p my-0-25 mt-1 text-bold-weight"
          >
            LOGIN
          </button>
        </form>

        <p className="sm-text my-0-5">
          Do not have an account yet?
          <Link
            to={routes.SIGNUP_PAGE}
            className="link primary-text hover-underline"
          >
            SignUp
          </Link>
        </p>
      </div>
    </main>
  );
};

export { LoginPage };
