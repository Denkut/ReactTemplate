import { setMealData } from './set-meal-data';
export const loadMealAsync = (requestServer, mealId) => dispatch => {
	requestServer('fetchMeal', mealId).then(mealData => {
		dispatch(setMealData(mealData.res));
	});
};
