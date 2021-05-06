import style from "./Egg.module.scss";

const Egg = ({ onClick, crackState }) => {
 
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 310 453.8"
      style={{ enableBackground: "new 0 0 310 453.8" }}
      className={`${style.egg} ${crackState >= 7 && style.egg__hide}`}
      onClick={onClick}
    >
      <g
        id="eggTop"
        className={`${style.eggTop} ${crackState >= 7 && style.eggTop__open}`}
      >
        <g>
          <path
            className={style.st0}
            d="M51.7,221.3L2.4,270.5c1.8-9.9,4.5-19.7,8.2-29L61.2,80.4C64.7,58.2,76.1,38,93.1,23.3
			c17.2-14.8,39.3-23,62-23c22,0,43.4,7.7,60.3,21.5c16.7,13.7,28.4,32.8,32.8,53.8L297,237.3c4.5,10.4,7.8,21.4,9.8,32.6L257.9,221
			l-51.5,51.5L154.9,221l-51.8,51.8L51.7,221.3z"
          />
          <path
            className={style.st0}
            d="M155.2,0.7c21.9,0,43.2,7.6,60.1,21.5c16.7,13.7,28.3,32.7,32.7,53.7l0,0l0,0l48.7,161.5l0,0l0,0
			c4.3,10.1,7.5,20.6,9.6,31.4L258.4,221l-0.5-0.5l-0.5,0.5l-51,51l-51-51l-0.5-0.5l-0.5,0.5l-51.3,51.3l-51-51l-0.5-0.5l-0.5,0.5
			L2.9,269.5c1.8-9.6,4.5-19,8-28L61.5,80.5l0,0l0,0c3.5-22,14.8-42.2,31.8-56.8C110.5,8.8,132.5,0.7,155.2,0.7 M155.2,0
			c-47.6,0-87,34.8-94.3,80.3L10.3,241.4c-3.8,9.6-6.6,19.7-8.4,30.1l49.7-49.7l51.4,51.4l51.8-51.8l51.5,51.5l51.5-51.5l49.4,49.4
			c-2.1-11.7-5.5-23-10-33.6L248.6,75.7C239.5,32.4,201.1,0,155.2,0L155.2,0z"
          />
        </g>
        <g>
          <circle className={style.st1} cx="199.7" cy="98" r="39.7" />
          <path
            className={style.st1}
            d="M199.7,58.7c21.7,0,39.3,17.6,39.3,39.3s-17.6,39.3-39.3,39.3s-39.3-17.6-39.3-39.3S178,58.7,199.7,58.7
			 M199.7,58c-22.1,0-40,17.9-40,40s17.9,40,40,40s40-17.9,40-40S221.8,58,199.7,58L199.7,58z"
          />
        </g>
        <g>
          <circle className={style.st1} cx="104.7" cy="157" r="39.7" />
          <path
            className={style.st1}
            d="M104.7,117.7c21.7,0,39.3,17.6,39.3,39.3s-17.6,39.3-39.3,39.3c-21.7,0-39.3-17.6-39.3-39.3
			S83,117.7,104.7,117.7 M104.7,117c-22.1,0-40,17.9-40,40s17.9,40,40,40c22.1,0,40-17.9,40-40S126.8,117,104.7,117L104.7,117z"
          />
        </g>
      </g>
      <g id="eggBottom" className={style.eggBottom}>
        <g>
          <path
            className={style.st0}
            d="M155,453.4c-85.3,0-154.7-69.4-154.7-154.7c0-9.1,0.8-18.3,2.4-27.3L52,222.3l51.4,51.4l51.8-51.8l51.5,51.5
			l51.5-51.5l49,49c1.7,9.1,2.5,18.5,2.5,27.9C309.7,384.1,240.3,453.4,155,453.4z"
          />
          <path
            className={style.st0}
            d="M258.2,222.4l48.7,48.7c1.6,9.1,2.5,18.4,2.5,27.7c0,41.2-16.1,80-45.2,109.1s-67.9,45.2-109.1,45.2
			s-80-16.1-109.1-45.2S0.7,340,0.7,298.8c0-9.1,0.8-18.2,2.4-27.1L52,222.7l51,51l0.5,0.5l0.5-0.5l51.3-51.3l51,51l0.5,0.5l0.5-0.5
			L258.2,222.4 M258.2,221.5L206.7,273l-51.5-51.5l-51.8,51.8L52,221.8L2.4,271.3C0.8,280.2,0,289.4,0,298.8
			c0,85.6,69.4,155,155,155s155-69.4,155-155c0-9.6-0.9-18.9-2.5-28L258.2,221.5L258.2,221.5z"
          />
        </g>
        <g>
          <circle className={style.st1} cx="245.7" cy="309" r="39.7" />
          <path
            className={style.st1}
            d="M245.7,269.7c21.7,0,39.3,17.6,39.3,39.3s-17.6,39.3-39.3,39.3s-39.3-17.6-39.3-39.3S224,269.7,245.7,269.7
			 M245.7,269c-22.1,0-40,17.9-40,40s17.9,40,40,40s40-17.9,40-40S267.8,269,245.7,269L245.7,269z"
          />
        </g>
        <g>
          <ellipse
            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -236.3271 151.4555)"
            className={style.st1}
            cx="64.7"
            cy="361"
            rx="39.7"
            ry="39.7"
          />
          <path
            className={style.st1}
            d="M64.7,321.7c21.7,0,39.3,17.6,39.3,39.3c0,21.7-17.6,39.3-39.3,39.3S25.3,382.7,25.3,361
			C25.3,339.3,43,321.7,64.7,321.7 M64.7,321c-22.1,0-40,17.9-40,40c0,22.1,17.9,40,40,40s40-17.9,40-40
			C104.7,338.9,86.8,321,64.7,321L64.7,321z"
          />
        </g>
      </g>
      <g id="crack" className={style.crack}>
        <line
          className={`${style.st2} ${style.crackLine} ${
            crackState >= 1 && style.show
          }`}
          x1="2.2"
          y1="271.5"
          x2="52.2"
          y2="221.5"
          strokeWidth="6"
        />
        <line
          className={`${style.st2} ${style.crackLine} ${
            crackState >= 2 && style.show
          }`}
          x1="103.2"
          y1="273.5"
          x2="52.2"
          y2="221.5"
        />
        <line
          className={`${style.st2} ${style.crackLine} ${
            crackState >= 3 && style.show
          }`}
          x1="155.2"
          y1="221.5"
          x2="103.2"
          y2="273.5"
        />
        <line
          className={`${style.st2} ${style.crackLine} ${
            crackState >= 4 && style.show
          }`}
          x1="207.2"
          y1="272.5"
          x2="155.2"
          y2="221.5"
        />
        <line
          className={`${style.st2} ${style.crackLine} ${
            crackState >= 5 && style.show
          }`}
          x1="258.2"
          y1="221.5"
          x2="207.2"
          y2="272.5"
        />
        <line
          className={`${style.st2} ${style.crackLine} ${
            crackState >= 6 && style.show
          }`}
          x1="307.2"
          y1="270.5"
          x2="258.2"
          y2="221.5"
        />
      </g>
    </svg>
  );
};

export default Egg;
