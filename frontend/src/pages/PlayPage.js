import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";
import tamagotchi from "../images/tamagotchi.png";
import heart from "../images/heart.png";
import style from "../styles/pageStyles/playpage.module.scss";
import Button from "../components/button/Button";
import { useState, useEffect, useContext } from "react";
import Creature from "../components/creature/Creature";
import Egg from "../components/egg/Egg";
import { StatsContext } from "../state/statsContext";
import { authFetch } from "../auth/index";
import HealthBar from "../components/health_bar/HealthBar";

const PlayPage = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [isCheering, setIsCheering] = useState(false);
  const [state, dispatch] = useContext(StatsContext);
  const [isAwake, setIsAwake] = useState(true);
  const [eyes, setEyes] = useState("awake");
  const [mouth, setMouth] = useState("happy");
  const [hatched, setHatched] = useState(false);

  useEffect(() => {
    // if (state.isInitial) {
    authFetch("http://127.0.0.1:5000/api/tamagotcha_stats")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setHatched(json["is_hatched"]);
        dispatch({ type: "SET_STATS", payload: json[0] });
      });
    if (state.is_dead) {
      setEyes("dead");
    }
    // }
  }, []);

  const [crackState, setCrackState] = useState(0);
  const crackEgg = () => {
    setCrackState(crackState + 1);
    console.log(`crackState: ${crackState}`);
  };

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${window.$user_token["access_token"]}`
  );
  myHeaders.append("Content-Type", "application/json");

  const hatching = async () => {
    fetch("http://127.0.0.1:5000/api/update_tamagotcha", {
      method: "PUT",
      body: JSON.stringify({
        hatch: "true",
        food: "",
        drink: "",
        game: "",
        sleep: "",
      }),
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
    setTimeout(function () {
      setHatched(true);
    }, 10000);
  };
  console.log(state.is_dead);
  if (crackState >= 7) {
    hatching();
  }

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
    isCheering && setIsCheering(false);
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

  const drinking = () => {
    setIsCheering(true);
  };

  const eating = () => {
    setIsCheering(true);
  };

  let calcMouth = () => {
    if (!isAwake) {
      return "neutral";
    } else if (state.avgHealth > 60) {
      return "happy";
    } else if (state.avgHealth > 40) {
      return "neutral";
    } else {
      return "sad";
    }
  };

  return (
    <Layout pageTitle="Tamagotcha">
      <div className={style.playPage}>
        <div className={style.heartContainer}>
          <img src={heart} alt="Heart" />
        </div>
        <HealthBar />
        <div className={style.imageContainer}>
          <img src={tamagotchi} alt="Tamagotcha toy" />
          <Creature
            wave={isWaving}
            jump={isJumping}
            wiggle={isWiggling}
            resetAnimations={resetAnimations}
            cheer={isCheering}
            // Eye options: awake, asleep, dead
            eyeState={eyes}
            // Mouth options: happy, sad, neutral
            mouthState={calcMouth()}
            crackState={crackState}
          />
          {!state.isHatched && (
            <Egg onClick={crackEgg} crackState={crackState} />
          )}
          {isAwake && <Button className={style.btn1} onClick={handleBtn1} />}
          {isAwake && <Button className={style.btn2} onClick={handleBtn2} />}
          {isAwake && <Button className={style.btn3} onClick={handleBtn3} />}
        </div>
      </div>
      {isAwake && (
        <BottomNav
          toggleSleep={toggleAwake}
          onDrink={drinking}
          onEat={eating}
        />
      )}
    </Layout>
  );
};

export default PlayPage;
