import styles from './App.module.css';
import React from 'react';
import CalculatorKey from './CalculatorKey';
export class App extends React.Component {
	constructor() {
		super();
		this.state = {
			out: '0',
		};
		this.refOutput = React.createRef();
	}
	tapeNumber(value) {
		let currentValue = value;
		let output = this.refOutput.current;

		this.setState({
			out: currentValue,
		});

		if (output.value === '0') {
			output.value = '';
		}
		output.value += currentValue;
	}

	tapeOperation(value) {
		let output = this.refOutput.current;

		if (value === 'C') {
			output.value = '0';
		} else if (value === '=')
			try {
				output.value = eval(output.value);
			} catch {
				output.value = 'Недопустимое значение';
				setTimeout(() => {
					output.value = '0';
				}, 2000);
			}
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.output}>
					<input
						ref={this.refOutput}
						type="text"
						defaultValue={this.state.out}
					/>
				</div>
				<div className={styles.buttons}>
					{CalculatorKey.buttons.map((item, id) => (
						<button
							key={id}
							onClick={() => {
								this.tapeNumber(item.val);
							}}
						>
							{item.val}
						</button>
					))}
					{CalculatorKey.operations.map((item, id) => (
						<button
							key={id}
							onClick={() => {
								this.tapeOperation(item.val);
							}}
						>
							{item.val}
						</button>
					))}
				</div>
			</div>
		);
	}
}
//
