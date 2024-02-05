export const updateMeal = ({
	id,
	imageUrl,
	title,
	type,
	calories,
	dietCategory,
	price,
	ingredients,
	goal,
}) =>
	fetch(`http://localhost:3005/meals/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			type,
			calories,
			dietCategory,
			price,
			ingredients,
			goal,
		}),
	})
		.then(createdMeal => createdMeal.json())
		.catch(error => console.log('Ошибка добавления meal', error));
