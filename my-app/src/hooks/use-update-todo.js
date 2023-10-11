import { useState } from 'react';
import { fetchUpdateTodo } from '../utils/todos-api';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTodo = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = (todo) => {
		setIsUpdating(true);

		const updateTodosDbRef = ref(db, `todos/${todo.id}`);

		set(updateTodosDbRef, {
			...todo,
		})
			.then((response) => {
				console.log('Задача обновлена, ответ от сервера:', response);
			})
			.finally(() => setIsUpdating(false));
	};

	return {
		isUpdating,
		requestUpdateTodo,
	};
};
