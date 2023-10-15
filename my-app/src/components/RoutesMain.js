import { Routes, Route, NavLink, Outlet, useParams } from 'react-router-dom';
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
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};
