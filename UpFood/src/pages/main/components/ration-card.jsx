import React from 'react';
import { Link } from 'react-router-dom';
import { AddToCartButton } from '../../../components';
import { goals } from '../../../bff/constants';

export const RationCard = ({
	id,
	title,
	imageUrl,
	goal,
	totalCalories,
	totalPrices,
	mealTitles,
	content,
	type,
	isMarked,
	userGoal,
	userAllergies,
}) => {
	const displayMeals =
		mealTitles && mealTitles.length > 0
			? mealTitles.slice(0, 2).map((meal, index) => (
					<span key={index}>
						{meal}
						{index !== mealTitles.length - 1 && ', '}
					</span>
				))
			: null;

	const ellipsis =
		mealTitles && mealTitles.length > 2 ? <span>...</span> : null;

	const goalName =
		goals.find(item => String(item.id) === goal)?.name || 'Цель не указана';

	const isUserGoalMatching = String(userGoal) === goal;

	return (
		<div
			className={`mx-auto flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl ${
				isUserGoalMatching ? 'border-2 border-green-500' : ''
			} ${isMarked ? 'border-2 border-red-500' : ''}`}
		>
			<Link className="flex h-full flex-col" to={`/ration/${id}`}>
				<img
					className="h-48 w-full object-cover object-center"
					src={imageUrl}
					alt={title}
				/>
				<div className="flex flex-grow flex-col justify-between p-6">
					<h4 className="mb-2 text-xl font-bold">{title}</h4>
					<p className="mb-2 text-gray-700">{type}</p>
					<div className="mb-4 flex items-center">
						<span className="text-gray-500">
							Общие калории: {totalCalories}
						</span>
					</div>
					<div className="mt-4">
						<p className="mb-2 text-gray-700">
							Блюда: {displayMeals} {ellipsis}
						</p>
					</div>
					{content && (
						<div className="mb-4">
							<p className="text-gray-700">{content}</p>
						</div>
					)}
				</div>
				<div className="flex items-center justify-between bg-amber-600 px-6 py-4">
					<span className="font-bold text-white">₽{totalPrices}</span>
					<span className="text-gray-200">Цель: {goalName}</span>
				</div>
			</Link>

			<div className="bg-gray-100 p-4">
				<AddToCartButton
					itemId={id}
					itemType="ration"
					className="w-full rounded-full bg-amber-800 px-4 py-2 font-bold text-white hover:bg-amber-700 focus:outline-none"
				/>
			</div>
		</div>
	);
};
