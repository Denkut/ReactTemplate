export const SearchTodo = ({ searchTodo, handleSearch }) => {
	return (
		<div>
			<input
				type="text"
				placeholder="Найди задачу"
				className="todo-input search"
				value={searchTodo}
				onChange={handleSearch}
			/>
		</div>
	);
};
