import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {navigate, Router} from "@reach/router";
import HomePage from "./components/Home";
import LoginPage from "./components/Login";
import {auth} from "./components/firebaseApp/firebase";
import {Spinner} from "reactstrap";
import TestIntroPage from "./components/Test";

export const AuthContext = createContext(null);

function App() {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(null)

  const logOut = async () => {
    await auth.signOut();
    setAuthenticated(false);
    await navigate('/login')
  }

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        setUser(userAuth)
        setAuthenticated(true)
        //await navigate('/')
      } else {
        setAuthenticated(false)
        await navigate('/login')
      }
    })
  })

  return (
      <AuthContext.Provider value={[authenticated, setAuthenticated, user, setUser]}>
        {authenticated !== null ? <div className="App">
          <Router>
            <LoginPage path="/login"/>
            <HomePage logOutFunc={logOut} path="/"/>
            <TestIntroPage path="/testset/:id"/>
          </Router>
        </div> : <div className="loader">
          <Spinner type="grow"/>
        </div>}
      </AuthContext.Provider>
  );
}

export default App;
