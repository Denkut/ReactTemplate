import React, { useContext, useState } from 'react';
import { TodoForm } from './TodoForm';
import { AiOutlineFileDone } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context';

export const Todo = ({todos}) => {
	const [edit, setEdit] = useState({
		id: null,
		title: '',
	});
	const { completeTodo, updateTodo } = useContext(AppContext);

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
			<NavLink to={`/task/${todo.id}`}>
				<div className="todo-text" key={todo.id}>
					{todo.title}
				</div>
			</NavLink>

			<div className="icons">
				<AiOutlineFileDone
					onClick={() => completeTodo(todo)}
					className="done-icon"
				/>
			</div>
		</div>
	));
};
