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
  const [isAwake, setIsAwake] = useState(true);
  const [eyes, setEyes] = useState("awake");
  const [mouth, setMouth] = useState("happy");

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
  const toggleAwake = async () => {
    setIsAwake(!isAwake);
    setEyes("asleep");
    setMouth("neutral");
    setTimeout(function () {
      setIsAwake(true);
      setEyes("awake");
      setMouth("happy");
      setIsWaving(true);
      setIsWiggling(true);
    }, 10000);
  };
  const toggleDrinking = async () => {
    setIsJumping(true);
  };
  const toggleEating = async () => {
    setIsJumping(true);
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
            eyeState={eyes}
            // Mouth options: happy, sad, neutral
            mouthState={mouth}
            crackState={crackState}
          />
          <Egg onClick={crackEgg} crackState={crackState} />
          {isAwake && <Button className={style.btn1} onClick={handleBtn1} />}
          {isAwake && <Button className={style.btn2} onClick={handleBtn2} />}
          {isAwake && <Button className={style.btn3} onClick={handleBtn3} />}
        </div>
      </div>
      {isAwake && (
        <BottomNav
          toggleSleep={toggleAwake}
          onDrink={toggleDrinking}
          onEat={toggleEating}
        />
      )}
    </Layout>
  );
};

export default PlayPage;
