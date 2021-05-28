import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import commentReducer from "./reducer/commentReducer";
import loadingReducer from "./reducer/loadingReducer";
import navReducer from "./reducer/navReducer";
import postReducer from "./reducer/postReducer";
import searchReducer from "./reducer/searchReducer";
import { rootSaga } from "./saga/rootSaga";

const rootReducer = combineReducers({
  navReducer,
  commentReducer,
  postReducer,
  loadingReducer,
  searchReducer,
});

//make saga
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

export default store;

export type RootState = ReturnType<typeof rootReducer>;

sagaMiddleWare.run(rootSaga);
