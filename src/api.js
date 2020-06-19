import axios from 'axios';

let api = axios.create({
    headers: {
        'Client-ID': 'msqa4m7fnzhvv2d7a5lwea6q1vsmnp',
        'Authorization': 'Bearer b0lpzxh1mbpqyr6p1j415bnb7c92p3'
    }
})

/*

    CLIENT_ID = msqa4m7fnzhvv2d7a5lwea6q1vsmnp
    REDIRECT = 'http://192.168.1.51/'
    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

    LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=msqa4m7fnzhvv2d7a5lwea6q1vsmnp&redirect_uri=http://192.168.1.51/&response_type=token

*/

export default api;