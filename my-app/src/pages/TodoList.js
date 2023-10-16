import React, { useContext, useState } from 'react';
import { TodoForm } from '../components/TodoForm';
import { Todo } from '../components/Todo';
import { SearchTodo } from '../components/SearchTodo';
import { SortTodo } from '../components/SortTodo';
import { AppContext } from '../context';

export const TodoList = () => {
	const { todos, addTodo, updateTodo, removeTodo, completeTodo } =
		useContext(AppContext);
	const [searchText, setSearchText] = useState('');

	const [sortAlphabet, setSortAlphabet] = useState(false);

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	const handleSort = () => {
		setSortAlphabet(!sortAlphabet);
	};

	const filtteredTodos = todos.filter((todo) => {
		return todo.title.toLowerCase().includes(searchText.toLowerCase());
	});

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
