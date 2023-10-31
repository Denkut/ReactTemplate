import { useState } from 'react';
import { fetchUpdateTodo } from '../utils/todos-api';

export const useRequestUpdateTodo = (refreshTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = (todo) => {
		setIsUpdating(true);
		fetchUpdateTodo(todo)
			.then((response) => {
				console.log('Смартфон обновлён, ответ от сервера:', response);
				refreshTodos();
			})
			.finally(() => setIsUpdating(false));
	};

	return {
		isUpdating,
		requestUpdateTodo,
	};
};