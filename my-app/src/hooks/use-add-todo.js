import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTodo = () => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = (todo) => {
		setIsCreating(true);

		const addTodosDbRef = ref(db, 'todos');

		push(addTodosDbRef, {
			...todo,
			completed: false,
		})
			.then((response) => {
				console.log('Задача добавлена, ответ от сервера:', response);
			})
			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddTodo,
	};
};
