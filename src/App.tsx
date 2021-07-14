import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Counter,
  EmployeeList
} from "./screens";

function App() {
  return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/employee">Employee</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route path="/counter">
              <Counter />
            </Route>
            <Route path="/employee">
              <EmployeeList />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
