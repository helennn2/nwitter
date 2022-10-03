import React, { useState } from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import App from "./App";
import Navigation from "./Navigation";
import { Redirect } from 'react-router';


const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />} {/* &&: 여기에 존재하려면 Navigation이 true여야 한다는 뜻 */}
            <Switch>
                {isLoggedIn ? 
                (<div
                    style={{
                      maxWidth: 890,
                      width: "100%",
                      margin: "0 auto",
                      marginTop: 80,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                <Route exact path="/">
                    <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                    <Profile userObj={userObj} refreshUser={refreshUser} />
                </Route>
                <Redirect from="*" to="/" />
                </div>) : 
                (
                <>
                <Route exact path="/">
                    <Auth />
                </Route>
                <Redirect from="*" to="/" />
                </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;