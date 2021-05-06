import DropUp from "../drop_up/DropUp";
import food from "../../images/food.png";
import beer from "../../images/beer.png";
import moon from "../../images/moon.png";
import funIcon from "../../images/fun.png";
import style from "./BottomNav.module.scss";
import Button from "../button/Button";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { StatsContext } from "../../state/statsContext";

const BottomNav = ({ toggleSleep, onEat, onDrink }) => {
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
        <Button
          onClick={() => {
            updateDB({ food: "pizza" });
            onEat();
          }}
        >
          Pizza
        </Button>
        <Button
          onClick={() => {
            updateDB({ food: "soup" });
            onEat();
          }}
        >
          Soup
        </Button>
        <Button
          onClick={() => {
            updateDB({ food: "apple" });
            onEat();
          }}
        >
          Apple
        </Button>
        <Button
          onClick={() => {
            updateDB({ food: "popcorn" });
            onEat();
          }}
        >
          Popcorn
        </Button>
      </DropUp>
      <DropUp
        icon={beer}
        title="Beverages"
        isOpen={openIndex === 1}
        setOpenIndex={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
      >
        <Button
          onClick={() => {
            updateDB({ drink: "wine" });
            onDrink();
          }}
        >
          Wine
        </Button>
        <Button
          onClick={() => {
            updateDB({ drink: "beer" });
            onDrink();
          }}
        >
          Beer
        </Button>
        <Button
          onClick={() => {
            updateDB({ drink: "juice" });
            onDrink();
          }}
        >
          Juice
        </Button>
        <Button
          onClick={() => {
            updateDB({ drink: "water" });
            onDrink();
          }}
        >
          Water
        </Button>
      </DropUp>
      <DropUp
        icon={moon}
        title="Sleep"
        isOpen={openIndex === 2}
        setOpenIndex={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
      >
        <Button
          onClick={() => {
            updateDB({ sleep: "10min" });
            toggleSleep();
          }}
        >
          10 minutes
        </Button>
        <Button
          onClick={() => {
            updateDB({ sleep: "1hr" });
            toggleSleep();
          }}
        >
          1 Hour
        </Button>
        <Button
          onClick={() => {
            updateDB({ sleep: "8hr" });
            toggleSleep();
          }}
        >
          8 Hours
        </Button>
        <Button
          onClick={() => {
            updateDB({ sleep: "24hr" });
            toggleSleep();
          }}
        >
          24 Hours
        </Button>
      </DropUp>
      <DropUp
        icon={funIcon}
        title="Games"
        isOpen={openIndex === 3}
        setOpenIndex={() => setOpenIndex(openIndex === 3 ? -1 : 3)}
      >
        <Button
          onClick={() => updateDB({ game: "quiz" })}
          component={NavLink}
          to="/minigames/quiz"
        >
          Quiz
        </Button>
      </DropUp>
    </div>
  );
};

export default BottomNav;
