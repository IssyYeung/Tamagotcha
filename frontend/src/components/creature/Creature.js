import style from "./Creature.module.scss";
import { StatsContext } from "../../state/statsContext";
import { useContext } from "react";

const Creature = ({
  wave,
  cheer,
  jump,
  wiggle,
  eyeState = "awake",
  mouthState = "neutral",
  resetAnimations,
  crackState,
}) => {
  const [state, dispatch] = useContext(StatsContext);

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 282.6 287.5"
      style={{ enableBackground: "new 0 0 282.6 287.5" }}
      className={`${style.inEgg} ${jump && style.creature__jump} ${
        (state.isHatched || crackState >= 7) && style.creature
      }`}
      onAnimationEnd={resetAnimations}
    >
      <ellipse
        id="armLeft"
        className={`${style.armLeft} ${wave && style.armLeft__wave} ${
          cheer && style.armLeft__cheer
        } ${jump && style.armLeft__jump}`}
        cx="250.4"
        cy="156"
        rx="32.1"
        ry="15.8"
        onAnimationEnd={resetAnimations}
      />
      <ellipse
        id="armRight"
        className={`${style.armRight} ${cheer && style.armRight__cheer} ${
          jump && style.armRight__jump
        }`}
        cx="32.1"
        cy="156"
        rx="32.1"
        ry="15.8"
        onAnimationEnd={resetAnimations}
      />
      <ellipse
        id="legRight"
        className={`${style.legRight} ${jump && style.legRight__jump}`}
        cx="105.4"
        cy="261.6"
        rx="18.6"
        ry="25.7"
        onAnimationEnd={resetAnimations}
      />
      <ellipse
        id="legLeft"
        className={`${style.legLeft} ${jump && style.legLeft__jump}`}
        cx="176.3"
        cy="261.6"
        rx="18.6"
        ry="25.7"
        onAnimationEnd={resetAnimations}
      />
      <ellipse
        id="earLeft"
        className={`${style.earLeft} ${wiggle && style.earLeft__wiggle}`}
        cx="176.3"
        cy="51.4"
        rx="32.6"
        ry="51.4"
        onAnimationEnd={resetAnimations}
      />
      <ellipse
        id="earRight"
        className={`${style.earRight} ${wiggle && style.earRight__wiggle}`}
        cx="105.3"
        cy="51.4"
        rx="32.6"
        ry="51.4"
        onAnimationEnd={resetAnimations}
      />
      <circle className={style.body} cx="141" cy="156" r="97.6" />
      <path
        className={style.face}
        d="M82.9,108.7c-11.6,13.5-18.6,31-18.6,50.2c0,42.5,34.5,77,77,77c42.5,0,77-34.5,77-77c0-19.2-7-36.7-18.6-50.2
	H82.9z"
      />
      <circle
        id="eyeNormalRight"
        className={`${style.eyesNormal} ${eyeState === "awake" && style.show}`}
        cx="105.3"
        cy="137.1"
        r="12.9"
      />
      <circle
        id="eyeNormalLeft"
        className={`${style.eyesNormal} ${eyeState === "awake" && style.show}`}
        cx="176.3"
        cy="137.1"
        r="12.9"
      />
      <path
        id="mouthNeutral"
        className={`${style.mouthNeutral} ${
          mouthState === "neutral" && style.show
        }`}
        d="M167.7,183.7h-52.9c-3,0-5.4-2.4-5.4-5.4v0c0-3,2.4-5.4,5.4-5.4h52.9c3,0,5.4,2.4,5.4,5.4v0
	C173.1,181.3,170.7,183.7,167.7,183.7z"
      />
      <path
        id="mouth"
        className={`${style.mouth} ${mouthState === "sad" && style.show} ${
          mouthState === "happy" && style.mouthHappy
        }`}
        d="M141,152.7c-17.7,0-32,11.7-32,26.1h64C173,164.4,158.7,152.7,141,152.7z"
      />
      <rect
        id="sleepEyeRight"
        className={`${style.eyesAsleep} ${eyeState === "asleep" && style.show}`}
        x="90.5"
        y="133.8"
        width="29.6"
        height="6.7"
      />
      <rect
        id="sleepEyeLeft"
        className={`${style.eyesAsleep} ${eyeState === "asleep" && style.show}`}
        x="161.5"
        y="133.8"
        width="29.6"
        height="6.7"
      />
      <polygon
        id="deadEyeRight"
        className={`${style.eyesDead} ${eyeState === "dead" && style.show}`}
        points="118.2,144.7 110.1,136.6 118.2,128.5 113.5,123.8 105.4,131.9 97.3,123.8 92.6,128.5 
	100.7,136.6 92.6,144.7 97.3,149.4 105.4,141.3 113.5,149.4 "
      />
      <polygon
        id="deadEyeLeft"
        className={`${style.eyesDead} ${eyeState === "dead" && style.show}`}
        points="189.1,145.2 181.1,137.1 189.1,129 184.4,124.3 176.3,132.4 168.2,124.3 163.5,129 171.6,137.1 
	163.5,145.2 168.2,149.9 176.3,141.9 184.4,149.9 "
      />
    </svg>
  );
};

export default Creature;
