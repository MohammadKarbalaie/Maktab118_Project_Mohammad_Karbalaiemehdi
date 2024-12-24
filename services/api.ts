import axios from "axios";  

const apiClient = axios.create({  
    baseURL: "http://localhost:8000/api",  
    headers: {  
        "Content-Type": "application/json",  
    },  
});  

export const setAuthHeader = (accessToken: string) => {
    apiClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  };

export default apiClient;  