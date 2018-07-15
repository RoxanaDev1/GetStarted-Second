import * as React from "react";
import PresentationalComponent from "./components/PresentationalComponent";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <label>This is the App component</label>
        <PresentationalComponent />
      </div>
    );
  }
}
