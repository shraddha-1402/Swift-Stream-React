import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../components";
import { useAuth } from "../context/";
import { signupHandler } from "../utils/services";
import { routes } from "../constants";
import { useDynamicTitle } from "../hooks";

const SignupPage = () => {
  useDynamicTitle();
  const [
    { firstName, lastName, email, password },
    setSignupCredentials,
  ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setSignupCredentials((signupCredentials) => ({
      ...signupCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const navigate = useNavigate();
  const { authDispatch } = useAuth();

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    signupHandler(
      { firstName, lastName, email, password },
      authDispatch,
      navigate
    );
  };

  return (
    <main className="card mw-28r p-1 my-3-5 mx-auto">
      <h1 className="center-text my-0-5">Signup</h1>
      <div className="m-1">
        <form onSubmit={handleSignupSubmit}>
          <FormInput
            label="First Name"
            type="text"
            minLength={3}
            placeholder="Jon"
            value={firstName}
            name="firstName"
            changeHandler={handleInputChange}
          />

          <FormInput
            label="Last Name"
            type="text"
            minLength={3}
            placeholder="Doe"
            value={lastName}
            name="lastName"
            changeHandler={handleInputChange}
          />

          <FormInput
            label="Email"
            type="email"
            value={email}
            placeholder="abc@gmail.com"
            name="email"
            changeHandler={handleInputChange}
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            placeholder="minimum 8 characters"
            name="password"
            changeHandler={handleInputChange}
          />

          <div className="my-0-5">
            <input type="checkbox" id="term-and-condition" required />
            <label className="ml-0-25" htmlFor="term-and-condition">
              I accept all
              <a href="#" target="_blank" className="link primary-text ml-0-25">
                Terms and Conditions<span className="red-text">*</span>
              </a>
            </label>
          </div>

          <button className="btn btn-solid-primary w-100p my-0-25 mt-1 text-bold-weight">
            SIGNUP
          </button>
        </form>

        <p className="sm-text my-0-5">
          Alredy have an account?
          <Link
            to={routes.LOGIN_PAGE}
            className="link primary-text hover-underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export { SignupPage };
