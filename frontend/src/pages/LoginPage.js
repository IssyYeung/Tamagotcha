import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import { NavLink } from "react-router-dom";
import React, { useReducer } from "react";
import style from "../styles/pageStyles/loginpage.module.scss";

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
    formData.set("username", formInfo.email);
    formData.set("password", formInfo.password);
    //formData.set("remember", formInfo.remember);

    console.log(formInfo);
    console.log(formData);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    
    fetch("http://127.0.0.1:5000/api/login", requestOptions)
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
    <Layout pageTitle="Tamagotcha" showNavbar={false}>
      <div className={style.login}>
        <h2>Please login or register</h2>
        <form onSubmit={onSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your username"
            value={formInfo.username}
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
          <span>
            <label>Remember me</label>
            <input
              type="checkbox"
              //value={formInfo.remember}
              //onChange={handleChange}
            />
          </span>
          <Button
            to="/play"
            component="input"
            type="submit"
            value="Login"
            className={style.loginBtn}
          />
        </form>

        <Button
          to="/register"
          component={NavLink}
          className={style.registerBtn}
        >
          Register
        </Button>

        <Button to="/play" component={NavLink} className={style.loginBtn}>
          Pretend login. WILL REMOVE.
        </Button>
      </div>
    </Layout>
  );
};

export default LoginPage;
