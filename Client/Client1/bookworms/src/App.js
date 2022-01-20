import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Search from './Components/Search';
import Navbar from './Components/Navbar';
import Login from './Components/Security/Login';
import Register from './Components/Security/Register'
import Group from './Components/Group/Group';
import GroupLibrary from './Components/Group/GroupLibrary';

import './App.css'

import AuthContext from "./Context/UserContext"
import Library from './Components/Library';

function App() {

  const [currentUser, setCurrentUser] = useState()

  return (
    <>
      <AuthContext.Provider value={[currentUser, setCurrentUser]}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Switch>

              <Route path="/search/:search_query">
                <Search />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/register">
                <Register />
              </Route>

              <Route exact path="/library">
                <Library />
              </Route>

              <Route path="/library/:current_bookshelf">
                <Library />
              </Route>

              <Route exact path="/">
                <Home />
              </Route>

            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;