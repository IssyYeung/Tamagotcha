import DropUp from "../drop_up/DropUp";
import food from "../../images/food.png";
import beer from "../../images/beer.png";
import moon from "../../images/moon.png";
import fun from "../../images/fun.png";
import style from "./BottomNav.module.scss";
import Button from "../button/Button";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { authFetch } from "../../auth/index";
import { StatsContext } from "../../state/statsContext";

const BottomNav = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [sleep, setSleep] = useState([]);
  const [thirst, setThirst] = useState([]);
  const [hunger, setHunger] = useState([]);
  const [fun, setFun] = useState([]);

  const [state, dispatch] = useContext(StatsContext);

  useEffect(() => {
    authFetch("http://127.0.0.1:5000/api/tamagotcha_stats")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSleep(json[0].sleep);
        setThirst(json[0].thirst);
        setHunger(json[0].hunger);
        setFun(json[0].fun);
      });
  }, []);

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${window.$user_token["access_token"]}`
  );
  myHeaders.append("Content-Type", "application/json");

  const requestOptionsHunger = {
    method: "PUT",
    body: JSON.stringify({
      hunger: `${Math.min(100, hunger + 25)}`,
      thirst: `${Math.min(100, thirst)}`,
      fun: `${Math.min(100, fun)}`,
      sleep: `${Math.min(100, sleep)}`,
    }),
    headers: myHeaders,
  };

  const requestOptionsThirst = {
    method: "PUT",
    body: JSON.stringify({
      thirst: `${Math.min(100, thirst + 25)}`,
      hunger: `${Math.min(100, hunger)}`,
      fun: `${Math.min(100, fun)}`,
      sleep: `${Math.min(100, sleep)}`,
    }),
    headers: myHeaders,
  };

  const requestOptionsSleep = {
    method: "PUT",
    body: JSON.stringify({
      sleep: `${Math.min(100, sleep + 25)}`,
      hunger: `${Math.min(100, hunger)}`,
      fun: `${Math.min(100, fun)}`,
      thirst: `${Math.min(100, thirst)}`,
    }),
    headers: myHeaders,
  };

  const requestOptionsFun = {
    method: "PUT",
    body: JSON.stringify({
      fun: `${Math.min(0, fun + 35)}`,
      sleep: `${Math.min(100, sleep)}`,
      hunger: `${Math.min(100, hunger)}`,
      thirst: `${Math.min(100, thirst)}`,
    }),
    headers: myHeaders,
  };

  // These could be moved to statsContext if we wanted:
  const incrementHunger = () => {
    fetch("http://127.0.0.1:5000/api/update_tamagotcha", requestOptionsHunger)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(console.log("Hunger stat incremented."))
      .then(console.log(requestOptionsHunger.body));
  };

  const incrementThirst = () => {
    fetch("http://127.0.0.1:5000/api/update_tamagotcha", requestOptionsThirst)
      .then(console.log("Thirst stat incremented."))
      .then(console.log(requestOptionsThirst.body));
  };

  const incrementSleep = () => {
    fetch("http://127.0.0.1:5000/api/update_tamagotcha", requestOptionsSleep)
      .then(console.log("Sleep stat incremented."))
      .then(console.log(requestOptionsSleep.body));
  };

  const incrementFun = () => {
    fetch("http://127.0.0.1:5000/api/update_tamagotcha", requestOptionsFun)
      .then(console.log("Fun stat incremented."))
      .then(console.log(requestOptionsFun.body));
  };

  const handleHungerButton = () => {
    dispatch({ type: "UPDATE_STATS", payload: { hunger: 25 } });
    // wouldn't need this here if increment functions were in statsContext file:
    incrementHunger();
  };
  const handleThirstButton = () => {
    incrementThirst();
  };
  // const handleFunButton = () => {
  //   incrementFun();
  // };
  const handleSleepButton = () => {
    incrementSleep();
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
