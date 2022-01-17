import axios from 'axios';

// use env variables to override for mocking for tests
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

export const getRoutes = async () => {
  const { data } = await api.get('/Routes?format=json');
  return data;
};

export const getDirections = async (route) => {
  const { data } = await api.get(`/Directions/${route}?format=json`);
  return data;
};

export const getStops = async (route, direction) => {
  const { data } = await api.get(`/Stops/${route}/${direction}?format=json`);
  return data;
};

export default api;
