import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { onActionOne } from "../common/actions";
import { AppState } from "../common/app-state";

interface PresentationalComponentProps {
  text: string;
  onClickButton: any;
}

class PresentationalComponent extends React.Component<
  PresentationalComponentProps,
  {}
> {
  render() {
    return (
      <div>
        <button onClick={this.props.onClickButton}>Click Me!</button>
        <label>{this.props.text}</label>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  text: state.text
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClickButton: () => dispatch(onActionOne("I was clicked!"))
});

const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentationalComponent);

export default ContainerComponent;
