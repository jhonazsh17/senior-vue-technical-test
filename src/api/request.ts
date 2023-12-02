import axios from 'axios';

export const getAllProducts = async () => {
  return await axios.get('https://fakestoreapi.com/products');
}

export const getAllCategories = async () => {
  return await axios.get('https://fakestoreapi.com/products/categories');
}

export const getAllProductsByCategory = async (category: string) => {
  return await axios.get(`https://fakestoreapi.com/products/category/${category}`);
}