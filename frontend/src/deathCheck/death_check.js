// import { StatsContext } from "../state/statsContext";
// import { useContext } from "react";

// export const deathCheck = () => {
//   const [state, dispatch] = useContext(StatsContext);
//   const interval = setInterval(() => {
//     console.log("FFFFFFFFFFFFFFFFFF");
//     let count = 0;
//     if (
//       (parseInt(state.hunger) <= 0 ||
//         parseInt(state.thirst) <= 0 ||
//         parseInt(state.fun) <= 0 ||
//         parseInt(state.sleep) <= 0) &&
//       count == 0
//     ) {
//       count = 1;
//       dispatch({ type: "UPDATE_STATS", payload: { is_dead: true } });
//       const myHeaders = new Headers();
//       myHeaders.append(
//         "Authorization",
//         `Bearer ${window.$user_token["access_token"]}`
//       );
//       myHeaders.append("Content-Type", "application/json");

//       fetch("http://127.0.0.1:5000/api/update_tamagotcha", {
//         method: "PUT",
//         body: JSON.stringify({
//           hatch: "",
//           food: "",
//           drink: "",
//           game: "",
//           sleep: "",
//           is_dead: 1,
//         }),
//         headers: myHeaders,
//       });
//     }
//   }, 10000);
//   // if (state.is_dead) {
//   //   clearInterval(interval);
//   // }
// };
