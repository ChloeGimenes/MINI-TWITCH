import axios from 'axios';

/* KEYS API TWITCH FORM .ENV */
let api = axios.create({
    headers: {
        'Client-ID': process.env.REACT_APP_API_CLIENT_ID,
        'Authorization': process.env.REACT_APP_API_ATHORIZATION
        
    }
})

export default api;

/*

    CLIENT_ID = msqa4m7fnzhvv2d7a5lwea6q1vsmnp
    REDIRECT = 'http://192.168.1.51/'
    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

    LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=msqa4m7fnzhvv2d7a5lwea6q1vsmnp&redirect_uri=http://192.168.1.51/&response_type=token

*/

