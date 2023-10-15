import React, { useState } from 'react';
import './App.css';
import { RoutesMain } from './components/RoutesMain';
import { useRequestGetTodos } from './hooks/use-request-get-todos';
import { useRequestAddTodo } from './hooks/use-add-todo';
import { useRemoveTodo } from './hooks/use-remove-todo';
import { useRequestUpdateTodo } from './hooks/use-update-todo';

export const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);

	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);

	const { isDeleting, requestRemoveTodo } = useRemoveTodo(refreshTodos);

	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos);

	const addTodo = (todo) => {
		if (!todo.title || /^\s*$/.test(todo.title)) {
			return;
		}
		requestAddTodo(todo);
	};

	const updateTodo = (todo) => {
		if (!todo.title || /^\s*$/.test(todo.title)) {
			return;
		}
		requestUpdateTodo(todo);
	};

	const removeTodo = (id) => {
		requestRemoveTodo(id);
	};

	const completeTodo = (todo) => {
		requestUpdateTodo({
			...todo,
			completed: !todo.completed,
		});
	};
	return (
		<div className="todo-app ">
			<RoutesMain
				todos={todos}
				addTodo={addTodo}
				updateTodo={updateTodo}
				removeTodo={removeTodo}
				completeTodo={completeTodo}
			/>
		</div>
	);
};
