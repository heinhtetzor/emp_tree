import React from 'react';
import './App.css';
import Explorer from './pages/Explorer';
import Overview from './pages/Overview';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>


      <Switch>
          <Route exact path="/">
            <Explorer />
          </Route>
          <Route path="/overview/:searchInput">
            <Overview />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
