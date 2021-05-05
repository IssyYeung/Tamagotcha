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
    authFetch("http://127.0.0.1:5000/api/tamagotcha_stats")
      .then((res) => res.json())
      .then((json) => {
        // setName(json[0].name);
        // setBreed(json[0].breed);
        // setTimeBorn(json[0].time_of_birth);
        // setSleep(json[0].sleep);
        // setThirst(json[0].thirst);
        // setHunger(json[0].hunger);
        // setFun(json[0].fun);
        console.log(json);
        dispatch({ type: "SET_STATS", payload: json[0] });
        // dispatch sends actions to reducer function
      });
  }, []);

  const timeBornMs = new Date(state.timeBorn);
  const age = Math.round((currentTime - timeBornMs) / (1000 * 60 * 60));

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
