import { useContext, useEffect } from "react";
/* import React Router*/
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/* import components */
import Navbar from "./components/layout/Navbar";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import setAuthToken from "./utils/setAuthToken";
// context
import AuthContext from "./context/auth/authContext";
import Home from "./pages/home/Home";
import Checkout from "./pages/checkout/Checkout";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history]);

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Login} path="/login" exact />
          <Route component={Register} path="/register" exact />
          <Route component={Checkout} path="/buy/:id" exact />
        </Switch>
      </Router>
    </>
  );
};

export default App;
