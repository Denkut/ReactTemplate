/* eslint no-eval: 0 */
import React, { useState } from 'react';
import styles from './App.module.css';
import { Input } from './input';

export const App = () => {
	const [result, setResult] = useState('');
	const [showGreenResult, setShowGreenResult] = useState(false);

	const handleClick = (e) => {
		setResult(result.concat(e.target.name));
	};

	const clear = () => {
		setResult('');
		setShowGreenResult(!showGreenResult);
	};

	const backspace = () => {
		setResult(result.slice(0, -1));
	};

	const calculate = () => {
		try {
			setResult(eval(result).toString());
			setShowGreenResult(!showGreenResult);
		} catch (err) {
			setResult('Error');
			setTimeout(() => {
				setResult('0');
			}, 1500);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<Input />
				<div className={showGreenResult ? styles.resultShow : styles.inputValue}>
					{result}
				</div>
				<div className={styles.keypad}>
					<button
						className={styles.highlight}
						onClick={clear}
						id={styles.clear}
					>
						С
					</button>
					<button
						className={styles.highlight}
						onClick={backspace}
						id={styles.backspace}
					>
						CЕ
					</button>
					<button className={styles.highlight} name="/" onClick={handleClick}>
						&divide;
					</button>
					<button name="7" onClick={handleClick}>
						7
					</button>
					<button name="8" onClick={handleClick}>
						8
					</button>
					<button name="9" onClick={handleClick}>
						9
					</button>
					<button className={styles.highlight} name="*" onClick={handleClick}>
						&times;
					</button>
					<button name="4" onClick={handleClick}>
						4
					</button>
					<button name="5" onClick={handleClick}>
						5
					</button>
					<button name="6" onClick={handleClick}>
						6
					</button>
					<button className={styles.highlight} name="-" onClick={handleClick}>
						&ndash;
					</button>
					<button name="1" onClick={handleClick}>
						1
					</button>
					<button name="2" onClick={handleClick}>
						2
					</button>
					<button name="3" onClick={handleClick}>
						3
					</button>
					<button className={styles.highlight} name="+" onClick={handleClick}>
						+
					</button>
					<button name="0" onClick={handleClick}>
						0
					</button>

					<button
						className={styles.highlight}
						onClick={calculate}
						id={styles.result}
					>
						=
					</button>
				</div>
			</div>
		</>
	);
};
