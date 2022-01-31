import axios from 'axios';

let headers;
let token = localStorage.getItem('token');

if (token) {
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  };
} else {
  headers = { Accept: 'application/json' };
}

export default axios.create({
  baseURL: 'http://localhost:8000/api',
  headers,
});
