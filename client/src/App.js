import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import CaseList from './pages/CaseList'
import CaseAdd from './pages/CaseAdd'
import StationAdd from './pages/StationAdd'
function App() {
  function requireCheck() {
		if (localStorage.getItem("token")) {
			return true;
		}
		return false;
  }
  return (
    <div>
      <>
        {requireCheck() ? <NavBar /> : null}
        <Switch>
          <Route path="/login" render={(props) => requireCheck() ? <Redirect to="/" /> : <Login {...props}/> } />
          <Route path="/" exact render={(props) => requireCheck() ? <CaseList {...props}/> : <Redirect to="/login" /> }/>
          <Route path="/add" render={(props) => requireCheck() ? <CaseAdd {...props}/> : <Redirect to="/login" /> } />
          <Route path="/stationadd" render={(props) => requireCheck() ? <StationAdd {...props}/> : <Redirect to="/login" /> } />
        </Switch>
      </>
    </div>
  );
}

export default App;
