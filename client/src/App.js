import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import CaseList from './pages/CaseList'
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
          <Route path="/" render={(props) => requireCheck() ? <Redirect to="/" /> : <CaseList {...props}/> } />
        </Switch>
      </>
    </div>
  );
}

export default App;
