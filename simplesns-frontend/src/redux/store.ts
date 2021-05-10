import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { navReducer } from "./reducer/navReducer";
import { navSaga } from "./saga/navSaga";
const reducer = combineReducers({
  nav: navReducer,
});
//make saga
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

export default store;

sagaMiddleWare.run(navSaga);
