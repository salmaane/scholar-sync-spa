import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_SCHOLAR_SYNC_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default instance;