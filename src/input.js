import styles from './App.module.css';

export const Input = ({ result }) => {
	return (
		<div className={styles.input}>
			<div className={styles.result}>
				<h1>{result}</h1>
			</div>
		</div>
	);
};
