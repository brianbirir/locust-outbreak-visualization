import axios from 'axios';

export const fetchFarmData = (url: string) => {
    return axios.get(url);
};
