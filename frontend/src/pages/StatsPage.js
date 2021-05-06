import Layout from "../components/layout/Layout";
import StatBar from "../components/stat_bar/StatBar";
import style from "../styles/pageStyles/statspage.module.scss";
import { useEffect, useContext } from "react";
import { StatsContext } from "../state/statsContext";

const StatsPage = () => {
  const currentTime = new Date();
  const [state, dispatch] = useContext(StatsContext);
  // useContext looks up component tree to find StatsContext

  // useEffect(() => {});
  function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
  }

  const shownStats = [state.sleep, state.thirst, state.hunger, state.fun ]

  const findNeed = (array) => {
    
    const currentMin = indexOfMin(array)

    switch( currentMin ){
      case 0:
        return state.name + " is sleepy!"
      case 1:
        return state.name + " is thirsty!"
      case 2:
        return state.name +  " is hungry!"
      case 3:
        return state.name + " is bored!"
      default:
        return "All stats need to be increased!"
    }

  }

  useEffect(() => {
    findNeed(shownStats)
  }, [shownStats]);

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
            <h4>Needs: { findNeed(shownStats) }</h4>
          </div>
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
