import { NavLink } from "react-router-dom";
import style from "./Navbar.module.scss";
import stats from "../../images/stats.png";
import computer from "../../images/computer.png";
import tama from "../../images/tama.png";
import { useEffect, useContext } from "react";
import { StatsContext } from "../../state/statsContext";

const Navbar = () => {
  const [state, dispatch] = useContext(StatsContext);
  useEffect(() => {}, []);

  let count = 0;

  setInterval(() => {
    count += 1;
    console.log(count);
    if (
      parseInt(state.hunger) <= 0 ||
      parseInt(state.thirst) <= 0 ||
      parseInt(state.fun) <= 0 ||
      parseInt(state.sleep) <= 0
    ) {
      dispatch({ type: "UPDATE_STATS", payload: { is_dead: true } });
    }
  }, 10000);

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
