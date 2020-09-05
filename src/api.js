import axios from 'axios';

/* KEYS API TWITCH FORM .ENV */
let api = axios.create({
    headers: {
        'Client-ID': process.env.REACT_APP_API_CLIENT_ID,
        'Authorization': process.env.REACT_APP_API_ATHORIZATION
        
    }
})

export default api;

