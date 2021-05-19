import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import navReducer from "./reducer/navReducer";
import { navSaga } from "./saga/navSaga";
const rootReducer = combineReducers({
  navReducer,
});

//make saga
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

export default store;

export type RootState = ReturnType<typeof rootReducer>;

sagaMiddleWare.run(navSaga);
