import {incrementActionCount} from '../actions';
import { INCREMENT_ACTION_COUNT } from '../actions/action-types';

export const actionCounter = function(store) {
    return function(next){
        return function(action){

            if(action.type === INCREMENT_ACTION_COUNT) {
            store.dispatch(incrementActionCount());
            }

            console.log("action qui passe", action);
            next(action);
        }
    }
}