import DropUp from "../drop_up/DropUp";
import food from "../../images/food.png";
import beer from "../../images/beer.png";
import moon from "../../images/moon.png";
import funIcon from "../../images/fun.png";
import style from "./BottomNav.module.scss";
import Button from "../button/Button";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { authFetch } from "../../auth/index";
import { StatsContext } from "../../state/statsContext";

const BottomNav = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const [state, dispatch] = useContext(StatsContext);

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${window.$user_token["access_token"]}`
  );
  myHeaders.append("Content-Type", "application/json");

  const updateDB = ({
    food = "null",
    drink = "null",
    game = "null",
    sleep = "null",
  }) => {
    fetch("http://127.0.0.1:5000/api/update_tamagotcha", {
      method: "PUT",
      body: JSON.stringify({
        food: food,
        drink: drink,
        game: game,
        sleep: sleep,
      }),
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch({ type: "SET_STATS", payload: json });
      });
  };

  return (
    <div className={style.BottomNav}>
      <DropUp
        icon={food}
        title="Food"
        isOpen={openIndex === 0}
        setOpenIndex={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
      >
        <Button onClick={() => updateDB({ food: "pizza" })}>Pizza</Button>
        <Button onClick={() => updateDB({ food: "soup" })}>Soup</Button>
        <Button onClick={() => updateDB({ food: "apple" })}>Apple</Button>
        <Button onClick={() => updateDB({ food: "popcorn" })}>Popcorn</Button>
      </DropUp>
      <DropUp
        icon={beer}
        title="Beverages"
        isOpen={openIndex === 1}
        setOpenIndex={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
      >
        <Button onClick={() => updateDB({ drink: "wine" })}>Wine</Button>
        <Button onClick={() => updateDB({ drink: "beer" })}>Beer</Button>
        <Button onClick={() => updateDB({ drink: "Juice" })}>Juice</Button>
        <Button onClick={() => updateDB({ drink: "Water" })}>Water</Button>
      </DropUp>
      <DropUp
        icon={moon}
        title="Sleep"
        isOpen={openIndex === 2}
        setOpenIndex={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
      >
        <Button onClick={() => updateDB({ sleep: "10min" })}>10 minutes</Button>
        <Button onClick={() => updateDB({ sleep: "1hr" })}>1 Hour</Button>
        <Button onClick={() => updateDB({ sleep: "8hr" })}>8 Hours</Button>
        <Button onClick={() => updateDB({ sleep: "24hr" })}>24 Hours</Button>
      </DropUp>
      <DropUp
        icon={funIcon}
        title="Games"
        isOpen={openIndex === 3}
        setOpenIndex={() => setOpenIndex(openIndex === 3 ? -1 : 3)}
      >
        <Button component={NavLink} to="/minigames/quiz">
          Quiz
        </Button>
      </DropUp>
    </div>
  );
};

export default BottomNav;
