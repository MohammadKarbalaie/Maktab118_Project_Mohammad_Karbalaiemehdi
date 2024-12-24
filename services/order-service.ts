import apiClient from "./api";
import { urls } from "./urls";


export const getorders = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await apiClient.get(`${urls.orders}?page=${page}&limit=${limit}`); // اصلاح URL
        console.log("with pages", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in getOrders:", error);
        throw error;
    }
}