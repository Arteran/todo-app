import axios from 'axios';
import { Todo } from '../types/Todo';

axios.defaults.baseURL = 'http://localhost:3005';

export function getAll(): Promise<Todo[]> {
  return axios.get('/todos').then(res => res.data);
}

export async function getOne(id: number): Promise<Todo[]> {
  const response = await axios.get(`/todos/${id}`);

  return response.data;
}
