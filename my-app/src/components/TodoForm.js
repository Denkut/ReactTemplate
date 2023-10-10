import React, { useState, useEffect, useRef } from 'react';

export const TodoForm = ({ onSubmit, edit }) => {
	const [input, setInput] = useState(edit ? edit.title : '');

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	},[input]);

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const submitTodo = edit
			? {
					...edit,
					title: input,
			  }
			: {
					id: new Date(),
					title: input,
			  };
		onSubmit(submitTodo);

		setInput('');
	};
	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			{edit ? (
				<>
					<input
						type="text"
						placeholder="Обнови задачу..."
						value={input}
						name="text"
						className="todo-input edit-search"
						onChange={handleChange}
						ref={inputRef}
					/>
					<button className="todo-button edit">Обнови</button>
				</>
			) : (
				<>
					<input
						type="text"
						placeholder="Добавь задачу..."
						value={input}
						name="text"
						className="todo-input"
						onChange={handleChange}
						ref={inputRef}
					/>
					<button className="todo-button">Добавить задачу</button>
				</>
			)}
		</form>
	);
};
