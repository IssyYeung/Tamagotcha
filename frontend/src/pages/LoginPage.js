import Layout from "../components/layout/Layout";
import { NavLink } from "react-router-dom";
import React, { useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const LoginPage = () => {
  const [formInfo, setFormInfo] = useReducer(formReducer, {});

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("email", formInfo.email);
    formData.set("password", formInfo.password);
    formData.set("remember", formInfo.remember);

    console.log(formInfo);
    console.log(formData);
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch("http://127.0.0.1:8000/register/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handleChange = (event) => {
    setFormInfo({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div>
      <Layout pageTitle="Tamagotcha">
        <h2>Login Page</h2>
        <form onSubmit={onSubmit}>
          <div className="form-input">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formInfo.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-check-container">
            <label>Remember me</label>
            <input
              className="form-checkbox"
              type="checkbox"
              value={formInfo.remember}
              onChange={handleChange}
            />
          </div>
          <div className="form-button-container">
            <input className="form-button" type="submit" value="Login" />
          </div>
        </form>
        <p className="centered-text">Not yet have an account?</p>
        <div className="form-button-container">
          <NavLink to="/register" className="register-button">
            <button className="nav-link-button">Register now</button>
          </NavLink>
        </div>
      </Layout>
    </div>
  );
};

export default LoginPage;
