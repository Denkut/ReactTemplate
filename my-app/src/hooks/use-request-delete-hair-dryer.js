import { useState } from 'react';

export const useRequestDeleteHairDryer = (refreshProducts) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteHairDryer = () => {
		setIsDeleting(true);
		fetch('http://localhost:3005/products/003', {
			method: 'DELETE',
		})
			.then((rawRespone) => rawRespone.json())
			.then((response) => {
				console.log('Планшет удалён, ответ от сервера:', response);
				refreshProducts();
			})
			.finally(() => setIsDeleting(false));
	};
	return {
		isDeleting,
		requestDeleteHairDryer,
	};
};
