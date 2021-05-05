import { StatsContext } from "../../state/statsContext";
import { useContext } from "react";


export const Decrement_stats = () => {
  const [state, dispatch] = useContext(StatsContext);
  const interval = setInterval(() => {
  dispatch({ type: "UPDATE_STATS", payload: { hunger: Math.max(0, state.hunger-1), thirst: Math.max(0, state.thirst-1), sleep: Math.max(0, state.sleep-1), fun: Math.max(0, state.fun-1) } })
  }, 5000);
  //return () => clearInterval(interval);
};

