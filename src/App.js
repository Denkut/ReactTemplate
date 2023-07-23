/* eslint no-eval: 0 */
import React, { useState } from 'react';
import styles from './App.module.css';
import { Input } from './input';
// import CalculatorKey from './CalculatorKey';
// export class App extends React.Component {
// 	const [showGreenResult, setShowGreenResult] = useState(false);

// 	const onClick = () => {

// 		setShowText(!showText);
// 		};
// 	constructor() {
// 		super();
// 		this.state = {
// 			out: '0',
// 		};
// 		this.refOutput = React.createRef();
// 	}
// 	tapeNumber(value) {
// 		let currentValue = value;
// 		let output = this.refOutput.current;

// 		this.setState({
// 			out: currentValue,
// 		});

// 		if (output.value === '0') {
// 			output.value = '';
// 		}
// 		output.value += currentValue;
// 	}

// 	tapeOperation(value) {
// 		let output = this.refOutput.current;

// 		if (value === 'C') {
// 			output.value = '0';
// 		} else if (value === '=')
// 			try {
// 				output.value = eval(output.value);
// 			} catch {
// 				output.value = 'Недопустимое значение';
// 				setTimeout(() => {
// 					output.value = '0';
// 				}, 2000);
// 			}
// 	}

// 	render() {
// 		return (
// 			<div className={styles.container}>
// 				<div className={styles.output}>
// 					<input
// 						ref={this.refOutput}
// 						type="text"
// 						defaultValue={this.state.out}
// 					/>
// 				</div>
// 				<div className={styles.buttons}>
// 					{CalculatorKey.buttons.map((item, id) => (
// 						<button
// 							key={id}
// 							onClick={() => {
// 								this.tapeNumber(item.val);
// 							}}
// 						>
// 							{item.val}
// 						</button>
// 					))}
// 					{CalculatorKey.operations.map((item, id) => (
// 						<button
// 							key={id}
// 							onClick={() => {
// 								this.tapeOperation(item.val);
// 							}}
// 						>
// 							{item.val}
// 						</button>
// 					))}
// 				</div>
// 			</div>
// 		);
// 	}
// }
//

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
				{/* <form>
					<input
						className={
							showGreenResult ? styles.input_result : styles.input_value
						}
						type="text"
						value={result}
						onChange={(e) => setshowGreenResult(e.target.value)}
					/>
				</form> */}

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
