import { Route, Switch } from "react-router-dom";
import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import QuizPage from "./pages/QuizPage";
import { StatsContextProvider } from "./state/statsContext";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <StatsContextProvider>
          <ProtectedRoute exact path="/play" component={PlayPage} />
          <ProtectedRoute exact path="/stats" component={StatsPage} />
          <ProtectedRoute exact path="/account" component={AccountPage} />
          <ProtectedRoute exact path="/minigames/quiz" component={QuizPage} />
        </StatsContextProvider>
      </Switch>
    </div>
  );
}

export default App;
