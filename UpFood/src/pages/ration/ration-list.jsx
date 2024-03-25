import React, { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Search, RationCard, Pagination } from '../main/components';
import debounce from 'lodash.debounce';
import { getLastPageFromLinks } from '../main/utils';
import { PAGINATION_LIMIT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectRations, selectUser } from '../../selectors';
import { setRations } from '../../actions';
import { filterAllergenicRations } from '../../utils';

export const RationList = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const rations = useSelector(selectRations);
	const user = useSelector(selectUser);
	const userAllergies = user.allergenicIngredients || [];
	const userGoal = user.goal || [];
	const { markedRations, unmarkedRations } = filterAllergenicRations(
		rations,
		userAllergies,
	);
	const sortedRations = [...unmarkedRations, ...markedRations];

	useEffect(() => {
		const fetchRations = async () => {
			requestServer(
				'fetchRations',
				searchPhrase,
				page,
				PAGINATION_LIMIT,
			).then(({ res: { rations, links } }) => {
				dispatch(setRations(rations));
				setLastPage(getLastPageFromLinks(links));
			});
		};

		fetchRations();
	}, [requestServer, page, shouldSearch, dispatch]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 2000),
		[],
	);
	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className="relative isolate px-6 pt-14 lg:px-8">
			<Search
				className=""
				searchPhrase={searchPhrase}
				onChange={onSearch}
			/>

			<h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900 ">
				Наши рационы
			</h2>
			{sortedRations.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
					{sortedRations.map(
						({ id, title, imageUrl, goal, meals, content }) => {
							const totalCalories = meals.reduce(
								(sum, meal) =>
									sum +
									Number(meal.items[0].calories) *
										meal.items[0].quantity,
								0,
							);
							const totalPrices = meals.reduce(
								(sum, meal) =>
									sum +
									Number(meal.items[0].price) *
										meal.items[0].quantity,
								0,
							);
							const mealTitles = meals.map(
								meal => meal.items[0].title,
							);

							return (
								<RationCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									goal={goal}
									totalCalories={totalCalories}
									totalPrices={totalPrices}
									mealTitles={mealTitles}
									content={content}
									userAllergies={userAllergies}
									isMarked={
										!!markedRations.find(r => r.id === id)
									}
									userGoal={userGoal}
									markedRations={markedRations}
								/>
							);
						},
					)}
				</div>
			) : (
				<p>Загрузка рационов...</p>
			)}
			{lastPage > 1 && rations.length > 0 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};
