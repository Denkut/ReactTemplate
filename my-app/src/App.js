import { useState } from 'react';
import {
	useRequestAddVacuumCleaner,
	useRequestDeleteHairDryer,
	useRequestGetProducts,
	useRequestUpdateSmartphone,
} from './hooks';
import styles from './app.module.css';

export const App = () => {
	const [refreshProductsFlag, setRefreshProductFlag] = useState(false);
	const refreshProducts = () => setRefreshProductFlag(!refreshProductsFlag);

	const { isLoading, products } = useRequestGetProducts(refreshProductsFlag);

	const { isCreating, requestAddVacuumCleaner } =
		useRequestAddVacuumCleaner(refreshProducts);

	const { isDeleting, requestDeleteHairDryer } =
		useRequestDeleteHairDryer(refreshProducts);

	const { isUpdating, requestUpdateSmartphone } =
		useRequestUpdateSmartphone(refreshProducts);

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				products.map(({ id, name, price }) => (
					<div key={id}>
						{name} - {price} руб
					</div>
				))
			)}
			<button disabled={isCreating} onClick={requestAddVacuumCleaner}>
				Добавить пылесос
			</button>
			<button disabled={isUpdating} onClick={requestUpdateSmartphone}>
				Обновить смартфон
			</button>
			<button disabled={isDeleting} onClick={requestDeleteHairDryer}>
				Удалить фен
			</button>
		</div>
	);
};
