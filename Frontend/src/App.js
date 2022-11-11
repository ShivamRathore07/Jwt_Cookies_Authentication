import './App.css'
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/login"
import Register from "./components/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'universal-cookie';

function App() {

  const [ user, setLoginUser] = useState({})
  console.log(user)
  const cookies = new Cookies();
  console.log(cookies)
  console.log(cookies.get('check_Token'))

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            { cookies.get('check_Token') ? <Homepage setLoginUser={setLoginUser} user={user}/> :  <Login setLoginUser={setLoginUser}/>}
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
