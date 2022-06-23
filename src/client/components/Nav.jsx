import React from "react";
import {connect} from "react-redux";

const Nav = () => {
    return (
        <div className="navContainer">
            <div className="dropDown bg">
                <a href="/background">
                    Background
                </a>
            </div>
            <div className="dropDown sk">
                <a href="/skills">
                    Skills
                </a>
            </div>
            <div className="home">
            <a href="/home">
                    Home
                </a>
            </div>
        </div>
    )
}

export default connect(null)(Nav);