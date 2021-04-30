import Layout from "../components/layout/Layout";
import React, { useReducer } from "react";
// import Button from "../components/button/Button";
// import { NavLink } from "react-router-dom";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const RegisterPage = () => {
  const [formInfo, setFormInfo] = useReducer(formReducer, {});

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("username", formInfo.username);
    formData.set("email", formInfo.email);
    formData.set("password", formInfo.password);
    formData.set("confirm_password", formInfo.confirm_password);

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

  // method: "POST",
  // headers: {
  //   "Content-type": "application/json",
  // },
  // body: resBody,

  return (
    <div>
      <Layout pageTitle="TAMAGOTCHA">
        <h1>Register Page</h1>
        <form onSubmit={onSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your Username"
            value={formInfo.username}
            onChange={handleChange}
          />
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
          <input
            type="text"
            name="confirm_password"
            placeholder="Your password again"
            value={formInfo.confirm_password}
            onChange={handleChange}
          />
          <label>Remember me</label>
          <input type="submit" value="Login" />
        </form>
      </Layout>
    </div>
  );
};

export default RegisterPage;
