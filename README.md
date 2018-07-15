# Still Work in progress...

# GetStarted-TypeScript-Redux

Welcome to my "Get Started" series!

In this repository I am going to build the minimum settings to get started with TypeScript and Redux.

Redux is a very cool frontend pattern which allows the developer to follow a set of rules in order to create his application.

Many of us know, that usually managing the states in a frontend application can be a challenge, but using this framework we get a very structured way we need to work in.

Not all applications require Redux, one can work only with React to structure the code. I will show how to structure the same app using Redux and without using it.

I choose for this section to go for the most simple thing we can test that Redux is working, the reason for that is the fact that Redux has many components we need to set before we can start using it. I figured it might be most simple just to connect everything together before building anything on top of that.

I worked with Redux before, but I always find it difficult to remember what exactly to set up and how to connect stuff together. This was a learning experience for me too, and I am sure there is a lot to improve, so just remember, this is suppose to be basic.

# TL;DR

This repository can be also cloned and ran with the following:

`npm install`

`npm run build`

`npm start`

# Getting started - Clone the previous repository

This is built on top of my previous repository:
https://github.com/RoxanaDev1/GetStarted-TypeScript-Express-React

Cloning can be used with:

`git clone https://github.com/RoxanaDev1/GetStarted-TypeScript-Express-React.git`

And follow the `TL;DR` instructions.

# Redux - General information

Redux is a React frontend framework to help developers manage the state of the application. As a beginner developer to React, it might be difficult to know how to manage the state of the application.
What does it means "state of application" - it means for example:

- [Component]If you have a calendar - and you click a date on it - the state of the calendar is the date clicked.
- [Page]If you have a page which is loading images - the state of the page would be loading until the images loaded.
- [App]If you have a multi tabs application - the state of the application can be which tab is selected.

Using Redux, we can "solve" the problem of how to manage the state of the application of the latest 2 examples.
The reason why it should not solve the component state, is due to the fact that Redux state is also called global state, and when talking in terms of global we need to be very careful of what things should be included in such a state.

If we explore a bit what does it mean to have a "global" state - it means having one place for the whole application where we define what data is loaded, in what place in the application we are?

Note - I am not using React Router on purpose here.

# Redux - Installation

`npm install --save redux` - Notice here that we do not need @types/redux as they provide the types as part of the framework, you can however use the @types/redux.

`npm install npm install --save react-redux @types/react-redux` - This will install the needed react tools in order to use Redux, we will return to this a bit later.

# Redux - Creating Building Blocks

Redux has some unique building blocks, we will create the files and then while adding code, we will populate those files with content.

## Actions

A Redux action is like an event that is happening in the app that updates the global state. An action can be for example: get me the data when a button is clicked. When we trigger an action, it will return an object which describes what needs to be done, or what kind of request was triggered.

An action is usually constructed of:

- type - what is the action name.
- data - what data should the action transmit.

As an example let's create a "dummy" action called ActionOne.

Since we are using TypeScript, we will construct this in a couple of stages.

Create a `action-constants.ts` file with a single constant:

```
export const ACTION_ONE: string = "ACTION_ONE";
```

The reason why are creating this file, is to make sure that we are using the right action name and not something undefined due to a typo (which ideally should not happen due to TypeScript support).

Create a `action-types.ts` file with a single action:

```
import { AnyAction } from "redux";

export type ActionOneType = AnyAction & {
    text: string;
}
```

In this file we will define how the action objects would look like. Since action object is the returned object when triggering an action, it is important to define it so we can have intellisens once we return it. This might not be super important in a small app, but when the app grows this would be very useful.

Create a `actions.ts` file, with the function which we would trigger from the app:

```
import { ActionOneType } from "./action-types";
import { ACTION_ONE } from "./action-constants";

export function onActionOne(text: string): ActionOneType {
    const action: ActionOneType = {
        type: ACTION_ONE,
        text: text
    }
   return action;
}
```

In this file we created the function which we would call from the code. When we call this action with the new text we want to set to the state, it will return an action object which contains that text. This would later be handled by the reducer (next section).

## Reducer

A reducer is a common place where actions are handled, a reducer would handle the change of global state in response to actions being triggered and return the new state.

Note - As described in the documentation, the reducer should be `pure` meaning that all it does is that it takes what data the action is carrying, and sets it to the state, without mutating the state. This means that every time we assign a new state, we create a new object and append the new properties carried by the actions to it.

Create a file called `app-state.ts`. In this file we will describe the type of the app state:

```
export type AppState = {
    text: string;
}
```

As we only want to connect everything, the one thing we need to do is add a text, which is going to be a string.

Create a file called `reducer.ts`

In the begging of the file, we need to define what is the initial state of the application:

```
const initialState: AppState = {
    text: "This is initial text"
}
```

This initial state, we will use to set when the application is loading.

The next step would be to define the function that will handle the incoming actions and return a new state of the application:

```
export default function setAppState(state: AppState = initialState, action: AnyAction): AppState {
    switch(action.type) {
        case ACTION_ONE:
            return Object.assign({}, state, {text: (action as ActionOneType).text})
        default:
            return state

    }
}
```

Notice the defaulting of the state to the initial state, which would be returned in the default case.

In this function we will continue adding every new action that is added to the app.

Right now, the only action is `ACTION_ONE`, which would set the new incoming text to the state.

Also notice the `Object.assign`, which is used to create a new state from previous state and the new one.

### Possible hickups

Object.assign is going to show an error:
`error TS2339: Property 'assign' does not exist on type 'ObjectConstructor'.`
This error happens because the project is set to ES5 and not ES6.

In order to resolve this change target in `tsconfig.json`:
`"target": "es6"`

## The Store

The store is the place where everything comes together. The store is where the global state is held, and the place which will react to the returned new state from the reducer.

We usually create the store at the root of the application, in our case the `index.tsx` file:

```
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import setAppState from "./common/reducer";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";

const store: Store = createStore(setAppState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("appContainer")
);
```

In this file we used the `createStore` function from Redux. This is the function that creates the global store, and connects it to the Reducer (in our case called setAppState).

In order to "attach" the store to the application, we will use the `Provider` container which is a component provided by `react-redux`. Using the the `Provider` we only need to provide the store once, and all the other components would be able to access it.

# Connect - Put things to work! (with some explanation before we do...)

Redux patterns recommend differentiating between components which are presentational and container components.
Let's explain in short:

- Presentational - A component that does not dispatch events, but get the needed info including onClick callbacks through props. We can say it is not store aware component - it should be simple: show the props the component gets.
  An example can be: a notification message where it only shows the notification text.
- Container - A component that contains a presentational component and dispatches events to the store. We can also say that this is the component that would send the callbacks to the presentational components.
  An example can be: a component that processes notifications and asks a presentational component to display them.
- Mixed - Some mix between the 2, when one component is not clear to be one or the other.

Let's refactor a bit and create our `SimpleComponent` into the following:
Notice the renaming of the component.

```
import * as React from "react";

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
```

Since we are using react-redux, it might be a waste to create 2 files for each component, this is why we will use the `connect` function!

So here is a question everyone is asking: what is the `connect` function does?

From the react-redux documentation:
`Connects a React component to a Redux store.`

The return value would be a new component which is a wrapper for the component which we `connected`.

In order to understand connect we need to understand the parameters which are sent to `connect`:

- mapStateToProps - This is a function which takes the state, and we map the attributes from the store which we need in this component. Let's add to `PresentationalComponent` a function (outside the class) as following:

```
const mapStateToProps = (state: AppState) => ({
  text: state.text
});
```

As we see in the example, the function takes the state from the store as a parameter, and all we need to do is map the attributes we need from the state to our component props.
Since we are working on a very simple example - we will only take the text.

- mapDispatchToProps - This is a function which takes dispatch as a param. Dispatch is a built in thing in redux, and it's job is to trigger (or dispatch) an action. Let's add to `PresentationalComponent` a function (outside the class) as following:

```
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClickButton: () => dispatch(onActionOne("I was clicked!"))
});
```

Since we refactored the component to also have a button, when we click the button we trigger the function from the props. For the purpose of this example, let's assume that when clicking the button we want to update the store with a new hardcoded text.
So the result for this function is that we mapped an action to our prop.

Now we are ready to write the connect (at the end of `PresentationalComponent` file):

```
const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentationalComponent);
```

As we can see here, we created a new const component `ContainerComponent` which would be the wrapper component to our `PresentationalComponent`. The `ContainerComponent` is created by calling `connect` with our 2 functions that we created earlier as parameters and our `PresentationalComponent` which we would like to wrap.

In the end we will export the `ContainerComponent` component as following:

```
export default ContainerComponent;
```

Now we can see the final file (in case something was not clear in the steps we followed):

```
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
```

Now that we changed the component `App.tsx` is probably complaining, so let's adapt the file as well:

```
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
```

All that is left is to RUN! So let`s execute the following:

`npm run build`

`npm start`

Now we can see that when the button is clicked, we fired an event which changed the state of the store with the new text, then the `PresentationalComponent` was updated with the new text.
