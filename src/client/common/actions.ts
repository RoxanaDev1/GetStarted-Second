import { ActionOneType } from "./action-types";
import { ACTION_ONE } from "./action-constants";

//Define what is action is created when action is called.
export function onActionOne(text: string): ActionOneType {
    const action: ActionOneType = {
        type: ACTION_ONE,
        text: text
    }
   return action;
}
