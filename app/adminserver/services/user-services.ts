import apiClient from "../server";
import { urls } from "../urls";

export const getUsers = async () => {
    try {
        const response = await apiClient.get(urls.users);
        console.log(response.data.data.users)
        return response.data.data.users;  
    } catch (error) {
        console.error("Error in getUsers:", error);
        throw error;
    }
}