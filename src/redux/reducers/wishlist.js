import {GET_ALL_WISH, ADD_WISHLIST, REMOVE_WISHLIST, TOGGLE_BUTTON_HIDE } from '../actions/action-types';

const initialState = {
    wish: [],
}

export default function wishListReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_WISH : 
        return {
            ...state,
            wish: action.payload,
            
        };
    
        case ADD_WISHLIST : 
        return {
            ...state,
            wish: [...state.wish, action.payload],
            
            
            
    };
        case REMOVE_WISHLIST :
        return {
            ...state,
            wish: Object.keys(state.wish)
              .filter(wish => state.wish[Number(wish)] !== action.payload )
              .map(wish => state.wish[Number(wish)]),
          
        };

    //     case TOGGLE_BUTTON_HIDE : 

    //     return {
    //         ...state.map(todo =>
    //             todo.id === action.payload.id ? { ...todo, added: !todo.added } : todo
    //           )
    // };
        
     default:
        return state
 }
};

