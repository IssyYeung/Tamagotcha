import style from "./StatBar.module.scss";

const StatBar = ({ statTitle, statValue }) => {
  return (
    <div className={style.statbar}>
      <div className={style.statTitleContainer}>
        <p>{statTitle}</p>
      </div>
      <div className={style.statValueContainer}>
        <p>{statValue}</p>
      </div>
    </div>
  );
};

export default StatBar;
