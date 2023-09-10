import { useState } from 'react';

export const useRequestAddVacuumCleaner = (refreshProducts) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddVacuumCleaner = () => {
		setIsCreating(true);
		fetch('http://localhost:3005/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: 'Новый пылесос',
				price: 4990,
			}),
		})
			.then((rawRespone) => rawRespone.json())
			.then((response) => {
				console.log('Пылесос добавлен, ответ от сервера:', response);
				refreshProducts();
			})
			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddVacuumCleaner,
	};
};
