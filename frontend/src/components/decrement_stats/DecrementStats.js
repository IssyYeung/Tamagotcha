import { StatsContext } from "../../state/statsContext";
import { useContext } from "react";

//DECREMENT_INTERVAL: 2 MINUTES (120000ms)
export const Decrement_stats = () => {
  const [state, dispatch] = useContext(StatsContext);
  const interval = setInterval(() => {
  dispatch({ type: "UPDATE_STATS", payload: { hunger: Math.max(0, state.hunger-1), thirst: Math.max(0, state.thirst-1), sleep: Math.max(0, state.sleep-1), fun: Math.max(0, state.fun-1) } })
  }, 120000);
  //return () => clearInterval(interval);
};


// //ALSO CHECK WHETHER TAMAGOTCHI IS DEAD AFTER EACH DECREMENT.
export const DeathCheck = () => {
  const [state, dispatch] = useContext(StatsContext);
  const interval_ = setInterval(() => {
    if(state.avgHealth == 0){
      dispatch({ type: "UPDATE_STATS", payload: { is_dead: 1} })
    } else{}
  }, 120001);
  //return () => clearInterval(interval_);
};

