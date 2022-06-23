import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {
    BrowserRouter,
} from "react-router-dom";
import App from "./components/App";
import store from "./store";
import './assets/styles.css';

const root = document.querySelector('#root');

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    root,
    () => console.log("Render complete!")
);
