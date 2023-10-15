import { useEffect, useState } from 'react';
import { getTodos } from '../utils/todos-api';

export const useRequestGetTodos = (refreshTodosFlag) => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getTodos()
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodosFlag]);

	return {
		todos,
		isLoading,
	};
};