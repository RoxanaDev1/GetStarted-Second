import { AnyAction } from "redux";


//Define how each action would look like here
export type ActionOneType = AnyAction & {
    text: string;
}
