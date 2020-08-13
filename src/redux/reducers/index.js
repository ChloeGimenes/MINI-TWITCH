import { combineReducers } from "redux";
import AuthenticationReducer from './authentication'
import ActionInfoReducer from "./action-info";
import { reducer as form} from "redux-form";
import ErrorsReducer from './errors';
import wishListReducer from "./wishlist";




const rootReducer = combineReducers({

    form,
    authentication : AuthenticationReducer,
    actionInfo: ActionInfoReducer,
    errors: ErrorsReducer,
    wish: wishListReducer,

});


export default rootReducer;


