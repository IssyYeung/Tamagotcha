import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import { NavLink } from "react-router-dom";

const AccountPage = () => {
  return (
    <div>
      <Layout pageTitle="Tamaccount">
        <h1>Account Page</h1>
        <NavLink to="/">
          <Button>Logout</Button>
        </NavLink>
      </Layout>
    </div>
  );
};

export default AccountPage;
