import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "Login";
import VideoEdit from "video-catalog/edit";
import VideoCatalog from "video-catalog";
import Header from "partials/Header";
import Footer from "partials/Footer";

function App() {
  const logged = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token"))
      dispatch({
        type: "SET_USER_STATE",
        payload: {
          userData: true,
        },
      });
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("token") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  };

  return (
    <Router>
      <>
        {logged && <Header />}
        <Switch>
          <PrivateRoute path="/video-catalog" component={VideoCatalog} />

          <PrivateRoute path="/video-catalog/:id" component={VideoEdit} />

          <Route path="/">
            <Login />
          </Route>
        </Switch>
        {logged && <Footer />}
      </>
    </Router>
  );
}

export default App;
