import { useState } from 'react';
import { fetchAddTodo } from '../utils/todos-api';

export const useRequestAddTodo = (refreshTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = (todo) => {
		setIsCreating(true);
		fetchAddTodo(todo)
			.then((response) => {
				console.log('Задача добавлена, ответ от сервера:', response);
				refreshTodos();
			})
			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddTodo,
	};
};