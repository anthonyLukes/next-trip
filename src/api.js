import axios from 'axios';

// use env variables to override for mocking for tests
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

export const getRoutes = async () => {
  return api.get('/Routes', {
    format: 'json',
  });
};

export const getDirections = async (route) => {
  return api.get(`/Directions/${route}`, {
    format: 'json',
  });
};

export const getStops = async (route, direction) => {
  return api.get(`/Stops/${route}/${direction}`, {
    format: 'json',
  });
};

export default api;
