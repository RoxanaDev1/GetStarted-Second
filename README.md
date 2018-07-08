# GetStarted-TypeScript-Express-React

Welcome to my "Get Started" series!

In this repository I am going to build the minimum settings to get started with TypeScript and Redux.

Redux is a very cool frontend pattern which allows the developer to follow a set of rules in order to create his application.

Many of us know, that usually managing the states in a frontend application can be a challenge, but using this framework we get a very structured way we need to work in.

Not all applications require Redux, one can work only with React to structure the code. I will show how to structure the same app using Redux and without using it.

I choose the classic TODO app, just because there is place to extend on it and is commonly used.

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
 * [Component]If you have a calendar - and you click a date on it - the state of the calendar is the date clicked.
 * [Page]If you have a page which is loading images - the state of the page would be loading until the images loaded.
 * [App]If you have a multi tabs application - the state of the application can be which tab is selected.

Using Redux, we can "solve" the problem of how to manage the state of the application of the latest 2 examples.
The reason why it should not solve the component state, is due to the fact that Redux state is also called global state, and when talking in terms of global we need to be very careful of what things should be included in such a state.

If we explore a bit what does it mean to have a "global" state - it means having one place for the whole application where we define what data is loaded, in what place in the application we are?

Note - I am not using React Router on purpose here.

# Redux - Installation

`npm install --save redux` - Notice here that we do not need @types/redux as they provide the types as part of the framework, you can however use the @types/redux.

# Redux - Creating Building Blocks

Redux has some unique building blocks, we will create the files and then while adding code, we will populate those files with content.

## Actions

A Redux action is like an event that is happening in the app that updates the global state. An action can be for example: get me the data when a button is clicked. When we trigger an action, it will return an object which describes what needs to be done, or what kind of request was triggered.

An action is usually constructed of:
* type - what is the action name.
* data - what data should the action transmit. 

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

