import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import ChangePassword from "../components/change_password/ChangePassword";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../styles/pageStyles/accountpage.module.scss";

const AccountPage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const username = "Boris";
  const email = "boris@boris.boris";
  const hoursPlayed = 48;
  /* These to be reults of GET request */

  return (
    <div>
      <Layout pageTitle="Tamaccount">
        <div className={style.accountPageContainer}>
          <div className={style.infoContainer}>
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
            <h4>Hours played: {hoursPlayed}</h4>
          </div>
          <div className={style.btnContainer}>
            <Button
              className={style.changePasswordBtn}
              onClick={() => {
                setShowChangePassword(!showChangePassword);
              }}
            >
              Change Password
            </Button>
            {showChangePassword && <ChangePassword />}
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
