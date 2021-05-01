import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import { NavLink } from "react-router-dom";
import style from "../styles/pageStyles/accountpage.module.scss";

const AccountPage = () => {
  const username = "Boris";
  const email = "boris@boris.boris";
  const hoursPlayed = 48;
  /* These to be reults of GET request */

  return (
    <div>
      <Layout pageTitle="Tamaccount">
        <h1>Account Page</h1>
        <div className={style.accountPageContainer}>
          <div className={style.infoContainer}>
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
            <h4>Hours played: {hoursPlayed}</h4>
          </div>
          <div className={style.btnContainer}>
            <Button className={style.changePasswordBtn}>Change Password</Button>
            <NavLink to="/">
              <Button className={style.logoutBtn}>Logout</Button>
            </NavLink>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AccountPage;
