import DropUp from "../drop_up/DropUp";
import food from "../../images/food.png";
import beer from "../../images/beer.png";
import moon from "../../images/moon.png";
import fun from "../../images/fun.png";
import style from "./BottomNav.module.scss";
import Button from "../button/Button";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { StatsContext } from "../../state/statsContext";

const BottomNav = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [state, dispatch] = useContext(StatsContext);

  const handleHungerButton = () => {
    dispatch({ type: "UPDATE_STATS", payload: { hunger: state.hunger + 25 } });
  };
  const handleThirstButton = () => {
    dispatch({ type: "UPDATE_STATS", payload: { thirst: state.thirst + 25 } });
  };
  const handleSleepButton = () => {
    dispatch({ type: "UPDATE_STATS", payload: { sleep: state.sleep + 25 } });
  };

  return (
    <div className={style.BottomNav}>
      <DropUp
        icon={food}
        title="Food"
        isOpen={openIndex === 0}
        setOpenIndex={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
      >
        <Button onClick={handleHungerButton}>Pizza</Button>
        <Button onClick={handleHungerButton}>Soup</Button>
        <Button onClick={handleHungerButton}>Apple</Button>
        <Button onClick={handleHungerButton}>Popcorn</Button>
      </DropUp>
      <DropUp
        icon={beer}
        title="Beverages"
        isOpen={openIndex === 1}
        setOpenIndex={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
      >
        <Button onClick={handleThirstButton}>Wine</Button>
        <Button onClick={handleThirstButton}>Beer</Button>
        <Button onClick={handleThirstButton}>Juice</Button>
        <Button onClick={handleThirstButton}>Water</Button>
      </DropUp>
      <DropUp
        icon={moon}
        title="Sleep"
        isOpen={openIndex === 2}
        setOpenIndex={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
      >
        <Button onClick={handleSleepButton}>10 minutes</Button>
        <Button onClick={handleSleepButton}>1 Hour</Button>
        <Button onClick={handleSleepButton}>8 Hours</Button>
        <Button onClick={handleSleepButton}>24 Hours</Button>
      </DropUp>
      <DropUp
        icon={fun}
        title="Games"
        isOpen={openIndex === 3}
        setOpenIndex={() => setOpenIndex(openIndex === 3 ? -1 : 3)}
      >
        <NavLink to="/minigames/quiz">
          <Button>Quiz</Button>
        </NavLink>
      </DropUp>
    </div>
  );
};

export default BottomNav;
