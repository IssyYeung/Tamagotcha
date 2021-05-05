import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return window.$user_token ? <Comp {...props} /> : <Redirect to="/" />;
        }}
      />
    );}

export default ProtectedRoute