import apiClient from '../server'; 
import { urls } from '../urls';
import {Category} from '../type/Category';

export const addCategory = async (data: Category): Promise<void> => {
  try {

    await apiClient.post(urls.categories, data);
    console.log('Category added successfully');
  } catch (error) {
    console.error('Failed to add category:', error);
    throw error;
  }
};


export const getCategories = async () => {
    try {
      const response = await apiClient.get(urls.categories); 
      return response.data; 
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error; 
    }
  };

 