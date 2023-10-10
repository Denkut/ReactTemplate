import { useState } from 'react';
import { fetchRemoveTodo } from '../utils/todos-api';

export const useRemoveTodo = (refreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestRemoveTodo = (id) => {
		setIsDeleting(true);
		fetchRemoveTodo(id)
			.then((response) => {
				console.log('Задача удалена, ответ от сервера:', response);
				refreshTodos();
			})
			.finally(() => setIsDeleting(false));
	};
	return {
		isDeleting,
		requestRemoveTodo,
	};
};
