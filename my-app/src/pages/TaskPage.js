import React, { useContext, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { BiArrowBack } from 'react-icons/bi';
import { TodoForm } from '../components/TodoForm';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context';

export const TaskPage = () => {
	const [isRemoved, setIsRemoved] = useState(false);
	
	const { todos, updateTodo, removeTodo } = useContext(AppContext);

	const [edit, setEdit] = useState({
		id: null,
		title: '',
	});

	const params = useParams();
	const navigate = useNavigate();

	const handleRemove = (id) => {
		removeTodo(id);
		setIsRemoved(true);
	};

	const submitUpdate = (todo) => {
		updateTodo(todo);
		setEdit({
			id: null,
			title: '',
		});
	};

	const currentTodo = todos.find((todo) => {
		return todo.id === params.id;
	});
	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}
	if (isRemoved) {
		return <h2>Задача успешно удалена</h2>;
	}

	if (typeof currentTodo === 'undefined') {
		return <h3>Задача не найдена</h3>;
	}
	return (
		<>
			<div>
				<div className="todo-row add">
					<div className="todo-text-add" key={currentTodo.id}>
						{currentTodo.title}
					</div>

					<div className="icons">
						<RiCloseCircleLine
							onClick={() => handleRemove(currentTodo.id)}
							className="delete-icon"
						/>
						<TiEdit
							onClick={() => setEdit(currentTodo)}
							className="edit-icon"
						/>
					</div>
				</div>
			</div>
			<BiArrowBack onClick={() => navigate(-1)} className="back-icon" />
		</>
	);
};
