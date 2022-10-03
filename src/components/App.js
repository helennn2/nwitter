import React, {useEffect, useState} from "react";
import AppRouter from "./Router";
import {authService} from "../myBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUseObj] = useState(null);
  useEffect(() => {
    /* authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUseObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true); */
      authService.onAuthStateChanged((user) => {
        if(user){
          setIsLoggedIn(true);
          setUseObj({
            displayName: user.displayName ? authService.currentUser.displayName : 'Anonymous',
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
          });
        }else{
          setUseObj(null);
        }
        setInit(true);
    });
  }, []);
  const refreshUser = () =>{
    const user = authService.currentUser;
    console.log(authService.currentUser);
    setUseObj({
            displayName: user.displayName ? authService.currentUser.displayName : 'Anonymous',
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
    });
  }
  return <>
  {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
  </>;
}

export default App;
