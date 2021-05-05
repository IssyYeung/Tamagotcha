import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import { NavLink, useHistory } from "react-router-dom";
import React, { useReducer, useContext } from "react";
import style from "../styles/pageStyles/loginpage.module.scss";
import { login, useAuth } from "../auth/index";
import { authFetch } from "../auth/index";
import { StatsContext } from "../state/statsContext";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const LoginPage = () => {

  const [state, dispatch] = useContext(StatsContext);
  const [formInfo, setFormInfo] = useReducer(formReducer, {});
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("username", formInfo.email);
    formData.set("password", formInfo.password);

    console.log(formInfo);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formInfo),
    };

    console.log(requestOptions.body);

    fetch("http://127.0.0.1:5000/api/login", requestOptions)
      .then((r) => r.json())
      .then((token) => {
        if (token.access_token) {
          login(token);
          console.log(token);
          window.$user_token = token;
          history.push("/play");
        } else {
          console.log("Please type in correct username/password");
        }
      });

      authFetch("http://127.0.0.1:5000/api/tamagotcha_stats")
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          dispatch({ type: "SET_STATS", payload: json[0] });
        });
      

  };

  const handleChange = (event) => {
    setFormInfo({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const [logged] = useAuth();

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
            value={formInfo.username || ""}
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
          <span>
            <label>Remember me</label>
            <input
              type="checkbox"
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
      </div>
    </Layout>
  );
};

export default LoginPage;
