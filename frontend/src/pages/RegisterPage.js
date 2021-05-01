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

  return (
    <div>
      <Layout pageTitle="Tamagotcha">
        <h2>Register Page</h2>
        <form onSubmit={onSubmit}>
          <div className="form-input">
            <input
              type="text"
              name="username"
              placeholder="Your Username"
              value={formInfo.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="email"
              placeholder="Your email address"
              value={formInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="password"
              placeholder="Your password"
              value={formInfo.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="confirm_password"
              placeholder="Your password again"
              value={formInfo.confirm_password}
              onChange={handleChange}
            />
          </div>
          <div className="form-button-container">
            <input className="form-button" type="submit" value="Sign up" />
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default RegisterPage;
