const API_URL = 'http://192.168.20.104:5000/';

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data.token;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password}),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
