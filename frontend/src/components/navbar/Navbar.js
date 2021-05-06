import { NavLink } from "react-router-dom";
import style from "./Navbar.module.scss";
import stats from "../../images/stats.png";
import computer from "../../images/computer.png";
import tama from "../../images/tama.png";
import { Decrement_stats, DeathCheck } from "../decrement_stats/DecrementStats";


const Navbar = () => {
  
  /* Call decrement/check_if_dead functions here since component is mounted on
  every logged-in page. */
  Decrement_stats()
  DeathCheck()

  return (
    <nav className={style.navbar}>
      <div>
        {/* <span> */}
        <NavLink to="/play">
          <img src={tama} alt="Tama pixel art" />
          Play
        </NavLink>
        {/* </span>
        <span> */}
        <NavLink to="/stats">
          <img src={stats} alt="Graph pixel art" />
          Stats
        </NavLink>
        {/* </span>
        <span> */}
        <NavLink to="/account">
          <img src={computer} alt="Computer pixel art" />
          Account
        </NavLink>
        {/* </span> */}
      </div>
    </nav>
  );
};

export default Navbar;
