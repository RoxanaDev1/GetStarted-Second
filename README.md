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

As an example I created a "dummy" action called ActionOne.