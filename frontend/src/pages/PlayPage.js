import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";
import tamagotchi from "../images/tamagotchi.png";
import style from "../styles/pageStyles/playpage.module.scss";
import Button from "../components/button/Button";
import { useState } from "react";
import Creature from "../components/creature/Creature";

const PlayPage = () => {
  const [color, setColor] = useState("yellow");
  return (
    <Layout pageTitle="Tamagotcha">
      <div className={style.playPage}>
        <div className={style.imageContainer}>
          {/* <HealthBar/>*/}
          <img src={tamagotchi} />
          {/* <div className={style.box} style={{ backgroundColor: color }}></div> */}
          <Creature />
          <Button className={style.btn1} onClick={() => setColor("blue")} />
          <Button className={style.btn2} onClick={() => setColor("red")} />
          <Button className={style.btn3} onClick={() => setColor("yellow")} />
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
};

export default PlayPage;
