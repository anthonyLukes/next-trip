import axios from 'axios';

// could add headers here if needed
const api = axios.create({
  baseURL: 'https://svc.metrotransit.org/NexTrip',
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
