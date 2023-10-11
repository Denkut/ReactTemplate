import React, { useEffect, useState } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { useRequestGetTodos } from '../hooks/use-request-get-todos';
import { useRequestAddTodo } from '../hooks/use-add-todo';
import { useRemoveTodo } from '../hooks/use-remove-todo';
import { useRequestUpdateTodo } from '../hooks/use-update-todo';
import { SearchTodo } from './SearchTodo';
import { SortTodo } from './SortTodo';

export const TodoList = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos();

	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);

	const { isDeleting, requestRemoveTodo } = useRemoveTodo(refreshTodos);

	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos);

	const [searchText, setSearchText] = useState('');

	const [sortAlphabet, setSortAlphabet] = useState(false);

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

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	const handleSort = () => {
		setSortAlphabet(!sortAlphabet);
	};
	const filtteredTodos = Object.entries(todos).filter(([id, todo]) => {
		return todo.title.toLowerCase().includes(searchText.toLowerCase());
	});
	console.log('todos', todos);

	const sortedTodos = [...filtteredTodos];
	if (sortAlphabet) {
		sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
	}

	return (
		<div>
			<h1>Какие планы на сегодня?</h1>
			<SortTodo handleSort={handleSort} />
			<SearchTodo searchTodo={searchText} handleSearch={handleSearch} />

			<TodoForm onSubmit={addTodo} />

			<Todo
				todos={sortedTodos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		</div>
	);
};
