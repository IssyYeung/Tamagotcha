import { Route, Switch } from "react-router-dom";
import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <h1>Hello!</h1>

      <Switch>
        <Route exact path="/" component={LoginPage} />
        {/* <Route exact path="/register" component={RegisterPage}/> */}
        <Route exact path="/play" component={PlayPage} />
        {/* <Route exact path="/stats" component={StatsPage}/>
        <Route exact path="/account" component={AccountPage}/> */}
      </Switch>
    </div>
  );
}

export default App;
