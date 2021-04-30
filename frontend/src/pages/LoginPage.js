import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <Layout pageTitle="TAMAGOTCHA">
        <h1>Login Page</h1>
        <form>
          <label>Email</label>
          <input type="text" name="email" placeholder="Your email address" />
          <label>Password</label>
          <input type="text" name="password" placeholder="Your password" />
          <label>Remember me</label>
          <input type="checkbox" />
          <input type="submit" value="Login" />
        </form>
        <NavLink to="/register">
          <Button>Register</Button>
        </NavLink>
      </Layout>
    </div>
  );
};

export default LoginPage;
