export const fetchAPI = (url: string, options = {}) =>
  fetch(
    `http://127.0.0.1:8000${url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    }
  );