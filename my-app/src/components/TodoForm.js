import React, { useState, useEffect, useRef } from 'react';

export const TodoForm = (props) => {
	const [input, setInput] = useState(props.edit ? props.edit.value : '');

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		props.onSubmit({
			id: new Date(),
			text: input,
		});

		setInput('');
	};
	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			{props.edit ? (
				<>
					<input
						type="text"
						placeholder="Обнови задачу..."
						value={input}
						name="text"
						className="todo-input edit"
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
