
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // troque pela URL da sua API
});

 // axios.post(api.baseURL + '/login', dados, {
 //   withCredentials: true // Permite cookies
 //   });

export const registerUser = async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
};
