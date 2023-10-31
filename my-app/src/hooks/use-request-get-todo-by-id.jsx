import { useEffect, useState } from 'react';
import { getTodoById } from '../utils/todos-api'; 

export const useRequestGetTodoById = (id) => {
	const [todo, setTodo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getTodoById(id) 
			.then((loadedTodo) => {
				setTodo(loadedTodo);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return {
		todo,
		isLoading,
	};
};
