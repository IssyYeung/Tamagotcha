import Layout from "../components/layout/Layout";
import StatBar from "../components/stat_bar/StatBar";
import style from "../styles/pageStyles/statspage.module.scss";

const StatsPage = () => {
  const sleep = 12;
  const thirst = 77;
  const hunger = 99;
  const fun = 43;
  const avgHealth = Math.floor((sleep + thirst + hunger + fun) / 4);
  /* These to be reults of GET request */

  return (
    <div>
      <Layout pageTitle="Tamastats">
        <h2>Stats Page</h2>
        <div className={style.statsPageContainer}>
          <div className={style.infoContainer}>
            <h4>Name: Boris</h4>
            <h4>Age: 40</h4>
            <h4>Breed: Duckster</h4>
            <h4>Needs:</h4>
          </div>
          <StatBar statTitle="Average Health" statValue={avgHealth} />
          <StatBar statTitle="Sleep" statValue={sleep} />
          <StatBar statTitle="Thirst" statValue={thirst} />
          <StatBar statTitle="Hunger" statValue={hunger} />
          <StatBar statTitle="Fun" statValue={fun} />
        </div>
      </Layout>
    </div>
  );
};

export default StatsPage;
