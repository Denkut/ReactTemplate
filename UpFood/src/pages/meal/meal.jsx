import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadMealAsync } from '../../actions';
import { selectMeal } from '../../selectors';
import { MealContent, MealDescription, MealEdit } from './components';

export const Meal = () => {
	const isCreating = !!useMatch('/meal');
	const isEditing = !!useMatch('/meal/:id/edit');
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const meal = useSelector(selectMeal);

	useEffect(() => {
		dispatch(loadMealAsync(requestServer, params.id));
	}, [dispatch, requestServer, params.id]);
	return (
		<div>
			{meal.id && (
				<>
					{isCreating || isEditing ? (
						<MealEdit meal={meal} />
					) : (
						<>
							<MealContent meal={meal} />
							<MealDescription
								ingredients={meal.ingredients}
								goal={meal.goal}
							/>
						</>
					)}
				</>
			)}
		</div>
	);
};
