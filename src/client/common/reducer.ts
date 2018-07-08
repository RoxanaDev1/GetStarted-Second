import { AppState } from "./app-state";
import { AnyAction } from "redux";
import { ACTION_ONE } from "./action-constants";
import { ActionOneType } from "./action-types";

const initialState: AppState = {
    text: "This is initial text"
}

export default function setAppState(state: AppState = initialState, action: AnyAction): AppState {
    switch(action.type) {
        case ACTION_ONE: 
            return Object.assign({}, state, {text: (action as ActionOneType).text})
        default:
            return state
    
    }
}