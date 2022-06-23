import React from "react";

class card {
    constructor(suit, number, action, wild) {
        this.suit = suit;
        this.number = number;
        this.action = action;
        this.wild = wild;
    }
}

const BackgroundPage = () => {
    return (
        <div className="background">
            Background!
        </div>
    )
}

export default BackgroundPage;