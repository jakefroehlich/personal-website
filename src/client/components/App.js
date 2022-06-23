import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Nav from "./Nav";
import HomePage from "./HomePage";
import BackgroundPage from "./BackgroundPage";

const App = () => {
    return (
        <div className="app">
            <div className="titleContainer">
                <h1>
                    JAKE FROEHLICH
                </h1>
            </div>
            <Nav />
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/background" component={BackgroundPage} />
                <Redirect to="/home" />
            </Switch>
        </div>
    );
};

export default connect(null)(App);