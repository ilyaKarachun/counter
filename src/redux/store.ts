import {combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./counterReducer";

const rootStore = combineReducers({
    state: counterReducer
})

export type AppRootStore = ReturnType<typeof rootStore>

export const store = legacy_createStore(rootStore)

