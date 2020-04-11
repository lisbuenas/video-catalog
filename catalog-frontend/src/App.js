import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";

import Login from "Login";
import VideoEdit from "video-catalog/edit";
import VideoCatalog from "video-catalog";
import Header from "partials/Header";
import Footer from "partials/Footer";
import { createStore } from "redux";

// import reducer from "redux/reducers";
import reducer from "redux/reducers";
import { Button } from "@material-ui/core";

const store = createStore(reducer);

function App() {
  const logged = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  console.log(logged);

  function teste() {
    dispatch({
      type: "SET_USER_STATE",
      payload: {
        userData: true,
      },
    });
  }
  return (
    <Router>
      <>
        {logged && <Header />}
        <Switch>
          <Route path="/video-catalog">
            <Button onClick={() => teste()}>Teste</Button>
            <VideoCatalog />
          </Route>
          <Route path="/video-catalog/:id">
            <VideoEdit />
          </Route>
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
