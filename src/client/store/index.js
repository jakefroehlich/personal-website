import {createStore, applyMiddleware, combineReducers} from "redux";
import thunks from "redux-thunk";

const reducer = (state= [], action) => {
    switch (action.type) {
        default:
            return state;
    };
};

const store = createStore(reducer, applyMiddleware(thunks));

export default store;