import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

export const App = () => {
	return (
		<div className="todo-app ">
			<TodoList />
		</div>
	);
};
