import { NavLink } from "react-router-dom";
import style from "./navbar.module.scss";
import stats from "../../images/stats.png";
import computer from "../../images/computer.png";
import tama from "../../images/tama.png";

const Navbar = () => {
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
