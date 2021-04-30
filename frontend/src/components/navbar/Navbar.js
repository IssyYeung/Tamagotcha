import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink to="/play">Play</NavLink>
      <NavLink to="/stats">Stats</NavLink>
      <NavLink to="/account">Account</NavLink>
    </div>
  );
};

export default Navbar;
