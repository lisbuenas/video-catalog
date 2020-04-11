 
import React, {useState}from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from 'Login';
import VideoEdit from 'video-catalog/edit';
import VideoCatalog from 'video-catalog';
import Header from 'components/Header';

function App() {
 return(<Router>
  <>
    <Header/>
    <Switch>
      <Route path="/video-catalog">
        <VideoCatalog />
      </Route>
      <Route path="/video-catalog/:id">
        <VideoEdit />
      </Route>
      <Route path="/">
        <Login/>
      </Route>
    </Switch>
  </>
</Router>)
}

export default App;
