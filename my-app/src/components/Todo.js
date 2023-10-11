import React, { useState } from 'react';
import { TodoForm } from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

export const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
	const [edit, setEdit] = useState({
		id: null,
		title: '',
	});

	const submitUpdate = (todo) => {
		updateTodo(todo);
		setEdit({
			id: null,
			title: '',
		});
	};

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}
	return todos.map((todo, index) => (
		<div className={todo.completed ? 'todo-row complete' : 'todo-row'} key={index}>
			<div key={todo.id} onClick={() => completeTodo(todo)}>
				{todo.title}
			</div>
			<div className="icons">
				<RiCloseCircleLine
					onClick={() => removeTodo(todo.id)}
					className="delete-icon"
				/>
				<TiEdit onClick={() => setEdit(todo)} className="edit-icon" />
			</div>
		</div>
	));
};
