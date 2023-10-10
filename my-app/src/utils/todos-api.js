import { API_TODOS_URL } from './constants';

export const getTodos = () => {
	return fetch(API_TODOS_URL).then((response) => response.json());
};

export const fetchAddTodo = (todo) => {
	return fetch(API_TODOS_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			...todo,
			completed: false,
		}),
	}).then((rawRespone) => rawRespone.json());
};

export const fetchRemoveTodo = (id) => {
	return fetch(`${API_TODOS_URL}/${id}`, {
		method: 'DELETE',
	}).then((rawRespone) => rawRespone.json());
};

export const fetchUpdateTodo = (todo) => {
	return fetch(`${API_TODOS_URL}/${todo.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			...todo,
		}),
	}).then((rawRespone) => rawRespone.json());
};
