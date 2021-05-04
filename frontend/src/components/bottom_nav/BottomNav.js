import DropUp from "../drop_up/DropUp";
import food from "../../images/food.png";
import beer from "../../images/beer.png";
import moon from "../../images/moon.png";
import fun from "../../images/fun.png";
import style from "./BottomNav.module.scss";
import Button from "../button/Button";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className={style.BottomNav}>
      <DropUp
        icon={food}
        title="Food"
        isOpen={openIndex === 0}
        setOpenIndex={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
      >
        <Button>Pizza</Button>
        <Button>Soup</Button>
        <Button>Apple</Button>
        <Button>Popcorn</Button>
      </DropUp>
      <DropUp
        icon={beer}
        title="Beverages"
        isOpen={openIndex === 1}
        setOpenIndex={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
      >
        <Button>Wine</Button>
        <Button>Beer</Button>
        <Button>Juice</Button>
        <Button>Water</Button>
      </DropUp>
      <DropUp
        icon={moon}
        title="Sleep"
        isOpen={openIndex === 2}
        setOpenIndex={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
      >
        <Button>10 minutes</Button>
        <Button>1 Hour</Button>
        <Button>8 Hours</Button>
        <Button>24 Hours</Button>
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
