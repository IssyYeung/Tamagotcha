import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";

const PlayPage = () => {
  return (
    <div>
      <Layout pageTitle="Tamagotcha">
        <h1>Play Page</h1>
        {/* <HealthBar/>
        <Tamagotcha/>*/}
        <BottomNav />
      </Layout>
    </div>
  );
};

export default PlayPage;
