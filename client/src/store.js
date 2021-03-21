import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import usersManagementApp from "./reducers";
import rootSaga from "./sagas";

const saga = createSagaMiddleware();

const store = createStore(
  usersManagementApp,
  compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

saga.run(rootSaga);

export default store;
