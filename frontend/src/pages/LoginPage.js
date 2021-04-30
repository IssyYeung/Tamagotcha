import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
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
        <h1>Login Page</h1>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Your email address"
            value={formInfo.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder="Your password"
            value={formInfo.password}
            onChange={handleChange}
          />
          <label>Remember me</label>
          <input
            type="checkbox"
            value={formInfo.remember}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
        <NavLink to="/register">
          <Button>Register</Button>
        </NavLink>
      </Layout>
    </div>
  );
};

export default LoginPage;
