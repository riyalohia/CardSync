export const fetchAPI = (url: string, options = {}) =>
  fetch(
    `${process.env.BACKEND_URL}${url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    }
  );