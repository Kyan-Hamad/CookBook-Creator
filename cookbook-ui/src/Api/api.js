// api.js

const API_URL = 'http://localhost:5000';

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
