import axios from 'axios';

const DIGINVEST_API_BASE_URL = "https://dig-investiment-api.herokuapp.com/";

export default function getOperacoes() {
  
  return axios.get(DIGINVEST_API_BASE_URL+'operacoes').then(res => res.data);
}

/*export function saveMovie(movie) {
  const { id } = movie;
  return api.put(`movies/${id}`, movie);
}

export function getMovie(id) {
  return api.get(`movies/${id}`).then(res => res.data);
}*/
