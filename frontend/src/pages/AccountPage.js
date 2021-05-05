import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import ChangePassword from "../components/change_password/ChangePassword";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../styles/pageStyles/accountpage.module.scss";
import { authFetch } from "../auth/index";

const AccountPage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [timeOnApp, setTimeOnApp] = useState([]);

  useEffect(() => {
    authFetch("http://127.0.0.1:5000/api/account")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUsername(json[0].username);
        setEmail(json[0].email);
        setTimeOnApp(json[0].time_on_app);
      });
  }, []);

  return (
    <div>
      <Layout pageTitle="Tamaccount">
        <div className={style.accountPageContainer}>
          <div className={style.infoContainer}>
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
            <h4>Hours played: {timeOnApp}</h4>
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
            <Button className={style.logoutBtn} component={NavLink} to="/">
              Logout
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AccountPage;
