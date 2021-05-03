import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";
import tamagotchi from "../images/tamagotchi.png";
import style from "../styles/pageStyles/playpage.module.scss";
import Button from "../components/button/Button";
import { useState } from "react";
import Creature from "../components/creature/Creature";

const PlayPage = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  // const [isCheering, setIsCheering] = useState(false);

  const handleBtn1 = () => {
    setIsWaving(true);
    // setIsCheering(true);
  };
  const handleBtn2 = () => {
    setIsWiggling(true);
  };
  const handleBtn3 = () => {
    setIsJumping(true);
  };
  const resetAnimations = () => {
    isWaving && setIsWaving(false);
    isWiggling && setIsWiggling(false);
    isJumping && setIsJumping(false);
    // isCheering && setIsCheering(false);
  };
  return (
    <Layout pageTitle="Tamagotcha">
      <div className={style.playPage}>
        <div className={style.imageContainer}>
          {/* <HealthBar/>*/}
          <img src={tamagotchi} alt="Tamagotcha toy" />
          <Creature
            wave={isWaving}
            jump={isJumping}
            wiggle={isWiggling}
            resetAnimations={resetAnimations}
            // cheer={isCheering}

            // Eye options: awake, asleep, dead
            // eyeState="asleep"
            // Mouth options: happy, sad, neutral
            // mouthState="sad"
          />
          <Button className={style.btn1} onClick={handleBtn1} />
          <Button className={style.btn2} onClick={handleBtn2} />
          <Button className={style.btn3} onClick={handleBtn3} />
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
};

export default PlayPage;
