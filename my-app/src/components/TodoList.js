import React, { useEffect, useState } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { API_TODOS_URL } from '../utils/constants';

export const TodoList = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch(API_TODOS_URL)
			.then((response) => response.json())
			.then((data) => {
				data = data.slice(0, 5); //for test
				setTodos(data);
			});
	}, []);

	const addTodo = (todo) => {
		if (!todo.title || /^\s*$/.test(todo.title)) {
			return;
		}

		const newTodos = [todo, ...todos];

		setTodos(newTodos);
	};

	const updateTodo = (todoId, newValue) => {
		if (!newValue.title || /^\s*$/.test(newValue.title)) {
			return;
		}

		setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
	};

	const removeTodo = (id) => {
		const removeArr = [...todos].filter((todo) => todo.id !== id);

		setTodos(removeArr);
	};

	const completeTodo = (id) => {
		let updateTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		setTodos(updateTodos);
	};
	return (
		<div>
			<h1>Какие планы на сегодня?</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		</div>
	);
};
