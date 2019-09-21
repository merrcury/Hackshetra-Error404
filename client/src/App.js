import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/Login'
function App() {
  return (
    <div>
      <>
        <NavBar />
        <Switch>
          <Route path="/login" render={() => <Login />} />
        </Switch>
      </>
    </div>
  );
}

export default App;
