import { useState } from 'react';
import { fetchRemoveTodo } from '../utils/todos-api';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRemoveTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestRemoveTodo = (id) => {
		setIsDeleting(true);

		const removeTodosDbRef = ref(db, `todos/${id}`);

		remove(removeTodosDbRef)
			.then((response) => {
				console.log('Задача удалена, ответ от сервера:', response);
			})
			.finally(() => setIsDeleting(false));
	};
	return {
		isDeleting,
		requestRemoveTodo,
	};
};
