import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskPage } from '../pages/TaskPage';
import { NotFound } from '../pages/NotFound';
import { TodoList } from '../pages/TodoList';

export const RoutesMain = ({ todos, addTodo, updateTodo, removeTodo, completeTodo }) => {
	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={
						<TodoList
							todos={todos}
							addTodo={addTodo}
							updateTodo={updateTodo}
							removeTodo={removeTodo}
							completeTodo={completeTodo}
						/>
					}
				/>
				<Route
					path="task/:id"
					element={
						<TaskPage
							todos={todos}
							updateTodo={updateTodo}
							removeTodo={removeTodo}
						/>
					}
				/>
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
