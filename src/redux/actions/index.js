import { SET_AUTHENTICATION, INCREMENT_ACTION_COUNT, PARSE_ERROR, RESET_ERROR} from './action-types';
import axios from "axios";


const BASE_URL="http://localhost:3090";


export function setAuthentication(isLoggedIn) {
    return {
        type: SET_AUTHENTICATION,
        payload: isLoggedIn
        }
 
    };


export function incrementActionCount() {
    return {
        type: INCREMENT_ACTION_COUNT,
       
};
}

export function signinUser({email, password}, history){

    return function(dispatch) {
        
        axios.post(`${BASE_URL}/signin`, {

            email,
            password

        })
        .then( (response) => {

            localStorage.setItem("token", response.data.token);
            dispatch(setAuthentication(true));
            history.push("/ressources");
        }).catch((error) => {
            console.log(error);
            dispatch(parseError("identifiants invalides"))
        })

    }
}

export function signoutUser(){

        return function(dispatch) {
            dispatch(setAuthentication(false));
            localStorage.removeItem("token");
        }
}

export function signupUser({ email, password }, history) {
    return function(dispatch) {
      axios
        .post(`${BASE_URL}/signup`, {
          email,
          password
        })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          dispatch(setAuthentication(true));
          history.push("/ressources");
        })
        .catch(error => {
          console.log(error);
            dispatch(parseError("email déjà existant"))
        });
    };
  }

  export function parseError(errorMessage) {
      return {type:PARSE_ERROR, payload:errorMessage}
  }

  export function resetError(errorMessage) {
    return {type:RESET_ERROR, payload:errorMessage}
}