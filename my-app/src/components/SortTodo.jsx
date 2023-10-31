export const SortTodo = ({ sortAlphabet, handleSort }) => {
	return (
		<div className="sort-check">
			<label>
				<span>Сортировать по алфавиту</span>
				<input type="checkbox" checked={sortAlphabet} onChange={handleSort} />
			</label>
		</div>
	);
};
