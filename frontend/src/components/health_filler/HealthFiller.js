import style from "./HealthFiller.module.scss";
import { useEffect, useContext } from "react";
import { StatsContext } from "../../state/statsContext";

const HealthFiller = () => {
  const [state, dispatch] = useContext(StatsContext);

  return (
    <div
      className={style.healthFiller}
      style={{ width: `${state.avgHealth * 2}px` }}
    ></div>
  );
};

export default HealthFiller;
