import Layout from "../components/layout/Layout";
import StatBar from "../components/stat_bar/StatBar";
import style from "../styles/pageStyles/statspage.module.scss";

const StatsPage = () => {
  return (
    <div>
      <Layout pageTitle="Tamastats">
        <h1>Stats Page</h1>
        <div className={style.statsPageContainer}>
          <div className={style.infoContainer}>
            <h3>Name: Boris</h3>
            <h3>Age: 40</h3>
            <h3>Breed: Duckster</h3>
            <h3>Needs:</h3>
          </div>
          <StatBar statTitle="Average Health" statValue="70" />
          <StatBar statTitle="Sleep" statValue="50" />
          <StatBar statTitle="Thirst" statValue="99" />
          <StatBar statTitle="Hunger" statValue="77" />
          <StatBar statTitle="Fun" statValue="12" />
        </div>
      </Layout>
    </div>
  );
};

export default StatsPage;
