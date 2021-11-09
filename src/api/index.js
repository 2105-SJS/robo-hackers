import axios from 'axios';

export const callAPI = async ({ url, method, token, body }) => {
  try {
    const options = {
      method: method ? method.toUpperCase() : 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.get(`/api/${url}`, options);
    const data = await response.data;
    return data;
  } catch (error) {
    throw error;
  }
}