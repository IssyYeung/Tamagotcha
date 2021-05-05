import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";
import tamagotchi from "../images/tamagotchi.png";
import style from "../styles/pageStyles/playpage.module.scss";
import Button from "../components/button/Button";
import { useState, useEffect, useContext } from "react";
import Creature from "../components/creature/Creature";
import Egg from "../components/egg/Egg";
import { Decrement_stats } from "../components/decrement_stats/DecrementStats";
import { StatsContext } from "../state/statsContext";
import { authFetch } from "../auth/index";

const PlayPage = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  // const [isCheering, setIsCheering] = useState(false);
  const [state, dispatch] = useContext(StatsContext);

  useEffect(() => {
    authFetch("http://127.0.0.1:5000/api/tamagotcha_stats")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch({ type: "SET_STATS", payload: json[0] });
      });
  }, []);

  Decrement_stats();

  const [crackState, setCrackState] = useState(0);
  const crackEgg = () => {
    setCrackState(crackState + 1);
    console.log(`crackState: ${crackState}`);
  };

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
            mouthState="happy"
            crackState={crackState}
          />
          <Egg onClick={crackEgg} crackState={crackState} />
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
