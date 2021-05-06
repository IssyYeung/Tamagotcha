import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import ChangePassword from "../components/change_password/ChangePassword";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import style from "../styles/pageStyles/accountpage.module.scss";
import { authFetch } from "../auth/index";
import { StatsContext } from "../state/statsContext";


const AccountPage = () => {

  const [state, dispatch] = useContext(StatsContext);

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

    const currentTime = new Date();
      var resultInSeconds=Math.round(currentTime.getTime());
      dispatch({ type: "UPDATE_STATS", payload: { last_active: resultInSeconds} });

  }, []);

  const myHeaders = new Headers();
    //myHeaders.append("Authorization", `Bearer ${window.$user_token["access_token"]}`);
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append( "Access-Control-Allow-Origin", "http://localhost:3000")
    // myHeaders.append( "Access-Control-Allow-Credentials", "True")
    // myHeaders.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

  const requestOptionsLogoutPutStats = {
      method: "PUT",
      body: JSON.stringify({ "fun": `${state.fun}`, "sleep": `${state.sleep}`, "hunger": `${state.hunger}`, "thirst": `${state.thirst}`, "last_active": `${state.last_active}` }),
      headers: myHeaders
      // {
      //   "Authorization": `Bearer ${window.$user_token["access_token"]}`,
      //   "Content-Type": "application/json",
      //   'Access-Control-Allow-Origin': 'http://localhost:5000'
      //   "Access-Control-Allow-Origin": "http://localhost:3000",
      //   "Access-Control-Allow-Credentials": "True",
      //   "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE"
      // }
  };

    const logoutBackendStatsUpdate = () => {
        fetch(`http://127.0.0.1:5000/update_tamagotcha/${state.id}`, {
          method: "PUT",
          body: JSON.stringify({ "fun": `${state.fun}`, "sleep": `${state.sleep}`, "hunger": `${state.hunger}`, "thirst": `${state.thirst}`, "last_active": `${state.last_active}`, "is_dead": `${state.is_dead}` }),
          headers: myHeaders
        }
        
        )
          // .then((response) => response.text())
          // .then((result) => console.log(result))
          .then(console.log("Final Stats put to backend."))
          //.then(console.log(requestOptionsLogoutPutStats.body))
      };

    const handleLogout = () => {
      logoutBackendStatsUpdate();
    }

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
            <NavLink to="/">
              <Button className={style.logoutBtn} onClick={handleLogout}>Logout</Button>
            </NavLink>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AccountPage;
