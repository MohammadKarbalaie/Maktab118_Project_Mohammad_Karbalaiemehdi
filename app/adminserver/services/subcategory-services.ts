import apiClient from "../server";
import { urls } from "../urls";

export const addSubCategory = async (data: {
  name: string;
  category: string;
}) => {
  try {
    const response = await apiClient.post(urls.subcategories, data);
    return response.data;
  } catch (error) {
    console.error("Error in addSubCategory:", error);
    throw error;
  }
};

export const getSubCategories = async () => {
  try {
    const response = await apiClient.get(urls.subcategories);
    return response.data.data.subcategories;
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    throw error;
  }
};
