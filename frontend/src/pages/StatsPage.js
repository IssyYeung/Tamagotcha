import Layout from "../components/layout/Layout";
import StatBar from "../components/stat_bar/StatBar";
import style from "../styles/pageStyles/statspage.module.scss";
import { authFetch } from "../auth/index";
import { useState, useEffect, useContext } from "react";
import { StatsContext } from "../state/statsContext";

const StatsPage = () => {
  // const [name, setName] = useState([]);
  // const [breed, setBreed] = useState([]);
  // const [sleep, setSleep] = useState([]);
  // const [thirst, setThirst] = useState([]);
  // const [hunger, setHunger] = useState([]);
  // const [timeBorn, setTimeBorn] = useState([]);
  // const [fun, setFun] = useState([]);
  const currentTime = new Date();
  const [state, dispatch] = useContext(StatsContext);
  // useContext looks up component tree to find StatsContext

  useEffect(() => {
    
    const interval = setInterval(() => {

      // authFetch("http://127.0.0.1:5000/api/tamagotcha_stats")
      // .then((res) => res.json())
      // .then((json) => {
      //   console.log(json);
      //   dispatch({ type: "SET_STATS", payload: json[0] });
      // });

    dispatch({ type: "UPDATE_STATS", payload: { hunger: Math.max(0, state.hunger-1), thirst: Math.max(0, state.thirst-1), sleep: Math.max(0, state.sleep-1), fun: Math.max(0, state.fun-1) } });
    }, 2000);
    return () => clearInterval(interval);

  }, []);

  const timeBornMs = new Date(state.timeBorn);
  const age = Math.round((currentTime - timeBornMs) / (1000 * 60 * 60));

  console.log(state)



  return (
    <div>
      <Layout pageTitle="Tamastats">
        <div className={style.statsPageContainer}>
          <div className={style.infoContainer}>
            <h4>Name: {state.name}</h4>
            <h4>Breed: {state.breed}</h4>
            <h4>Age: {age}</h4>
            <h4>Needs:</h4>
          </div>
          <div>{state.breed}</div>
          <StatBar statTitle="Average Health" statValue={state.avgHealth} />
          <StatBar statTitle="Sleep" statValue={state.sleep} />
          <StatBar statTitle="Thirst" statValue={state.thirst} />
          <StatBar statTitle="Hunger" statValue={state.hunger} />
          <StatBar statTitle="Fun" statValue={state.fun} />
        </div>
      </Layout>
    </div>
  );
};

export default StatsPage;
