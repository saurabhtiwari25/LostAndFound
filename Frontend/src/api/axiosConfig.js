import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// This is the line you are likely missing or wrote incorrectly:
export default instance;