import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useRequestGetTodos } from './hooks/use-request-get-todos';
import { useRequestAddTodo } from './hooks/use-add-todo';
import { useRemoveTodo } from './hooks/use-remove-todo';
import { useRequestUpdateTodo } from './hooks/use-update-todo';
import { AppContext } from './context';
import { TodoList } from './pages/TodoList';
import { TaskPage } from './pages/TaskPage';
import { NotFound } from './pages/NotFound';

export const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);

	const { requestAddTodo } = useRequestAddTodo(refreshTodos);

	const { isDeleting, requestRemoveTodo } = useRemoveTodo(refreshTodos);

	const { requestUpdateTodo } = useRequestUpdateTodo(refreshTodos);


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
		<AppContext.Provider
			value={{
				todos,
				isLoading,
				isDeleting,
				addTodo,
				updateTodo,
				removeTodo,
				completeTodo,
			}}
		>
			<div className="todo-app ">
				
				{isLoading || isDeleting ? (
					<div className="loading">Loading..</div> 
				) : (
					<div>
					<Routes>
						<Route path="/" element={<TodoList />} />
						<Route path="task/:id" element={<TaskPage />} />
						<Route path="/404" element={<NotFound />} />
						<Route path="*" element={<Navigate to="/404" />} />
					</Routes>
					</div>
				)}
			</div>
		</AppContext.Provider>
	);
};
