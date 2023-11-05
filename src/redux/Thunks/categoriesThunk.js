import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Replace with your API base URL

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch categories.');
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId) => { // Add categoryId as a parameter
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch categories.');
    }
  }
);


export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create category.');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, updatedData }) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/categories/${categoryId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update category.');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete category.');
    }
  }
);



export default {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
  
