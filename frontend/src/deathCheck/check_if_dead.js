import { StatsContext } from "../state/statsContext";
import { useContext } from "react";

export const DeathCheck = () => {
  const [state, dispatch] = useContext(StatsContext);
  const interval = setInterval(() => {
    console.log("FFFFFFFFFFFFFFFFFF");
    if (
      parseInt(state.hunger) <= 0 ||
      parseInt(state.thirst) <= 0 ||
      parseInt(state.fun) <= 0 ||
      parseInt(state.sleep) <= 0
    ) {
      dispatch({ type: "UPDATE_STATS", payload: { isDead: "true" } });
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${window.$user_token["access_token"]}`
      );
      myHeaders.append("Content-Type", "application/json");

      fetch("http://127.0.0.1:5000/api/update_tamagotcha", {
        method: "PUT",
        body: JSON.stringify({
          hatch: "",
          food: "",
          drink: "",
          game: "",
          sleep: "",
          isDead: 1,
        }),
        headers: myHeaders,
      });
    }
  }, 1000);
  //return () => clearInterval(interval);
};
