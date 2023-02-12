import {applyMiddleware} from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk"
import reducers from "./Reducers"


const store = createStore(reducers,{},applyMiddleware(thunk))

export default store;