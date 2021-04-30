import { Route, Switch } from "react-router-dom";
import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/play" component={PlayPage} />
        <Route exact path="/stats" component={StatsPage} />
        <Route exact path="/account" component={AccountPage} />
      </Switch>
    </div>
  );
}

export default App;
