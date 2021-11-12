import axios from 'axios';

export const callAPI = async ({ url, method, token, body }) => {
  try {
    const options = {
      method: method ? method.toUpperCase() : 'GET',
      url: `api/${url}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(body)
    }
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const response = await axios(options);
    const data = await response.data;
    return data;
  } catch (error) {
    throw error;
  }
}