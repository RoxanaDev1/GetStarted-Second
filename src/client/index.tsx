import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import setAppState from "./common/reducer";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";

const store: Store = createStore(setAppState);

console.log("Initial Store: ", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("appContainer")
);
