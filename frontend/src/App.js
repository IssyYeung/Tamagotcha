import { Route, Switch, Redirect } from "react-router-dom";
import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import QuizPage from "./pages/QuizPage";

function App() {
  const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return window.$user_token ? <Comp {...props} /> : <Redirect to="/" />;
        }}
      />
    );
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <ProtectedRoute exact path="/play" component={PlayPage} />
        <ProtectedRoute exact path="/stats" component={StatsPage} />
        <ProtectedRoute exact path="/account" component={AccountPage} />
        <ProtectedRoute exact path="/minigames/quiz" component={QuizPage} />
      </Switch>
    </div>
  );
}

export default App;
