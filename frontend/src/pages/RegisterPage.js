import Layout from "../components/layout/Layout";
import style from "../styles/pageStyles/registerpage.module.scss";
import Button from "../components/button/Button";
import React, { useReducer } from "react";
import { NavLink, useHistory } from "react-router-dom";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const RegisterPage = () => {
  const [formInfo, setFormInfo] = useReducer(formReducer, {});
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("username", formInfo.username);
    formData.set("email", formInfo.email);
    formData.set("password", formInfo.password);
    formData.set("confirm_password", formInfo.confirm_password);

    console.log(formInfo);
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(formInfo),
    };

    fetch("http://127.0.0.1:5000/api/register", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(history.push("/"))
      .catch((error) => console.log("error", error));
  };

  const handleChange = (event) => {
    setFormInfo({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <Layout pageTitle="Tamagotcha" showNavbar={false}>
      <div className={style.register}>
        <h2>Please register</h2>
        <form onSubmit={onSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your Username"
            value={formInfo.username || ""}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Your email address"
            value={formInfo.email || ""}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formInfo.password || ""}
            onChange={handleChange}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            placeholder="Your password again"
            value={formInfo.confirm_password || ""}
            onChange={handleChange}
          />
          <span>
            <label>Remember me</label>
            <input
              type="checkbox"
              value={formInfo.remember || ""}
              onChange={handleChange}
            />
          </span>
          <Button
            to="/play"
            component="input"
            type="submit"
            value="Register"
            className={style.registerBtn}
          />
        </form>
        <Button to="/" component={NavLink} className={style.loginBtn}>
          Return to login
        </Button>
      </div>
    </Layout>
  );
};

export default RegisterPage;
