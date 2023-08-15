/* eslint-disable */
import { useEffect, useState } from 'react';
import styles from './App.module.css';
//начальное состояние
const initialState = {
	email: '',
	password: '',
	confirmPassword: '',
};

const emailRegex =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//свой хук
const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		//возрващаем начальное состояние
		getState: () => state,
		//возвращаем обновленное состояние
		updateState: (fieldName, newValue) => {
			//передаем сначало начальное состояние(email, password, confirmPassword), потом новое состояние по имени[fieldName]
			setState({ ...state, [fieldName]: newValue });
			// console.log('updateState', state);
		},
	};
};
//передача в консоль
const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState } = useStore('');
	const [errors, setErrors] = useState({});
	const [validForm, setValidForm] = useState(false);

	const validateValues = (inputValues) => {
		let errors = {};
		console.log('validateValues', inputValues);
		if (inputValues.email.length > 0 && !emailRegex.test(inputValues.email)) {
			errors.email = 'Некоректный Email';
		}
		if (inputValues.password.length > 0 && inputValues.password.length < 2) {
			errors.password = 'Password is too short';
		}
		if (
			inputValues.confirmPassword.length > 0 &&
			inputValues.confirmPassword !== inputValues.password
		) {
			errors.confirmPassword = 'Пароль должен совпадать';
		}
		return errors;
	};

	const checkValidForm = () => {
		const form = getState();
		for (const key in form) {
			if (form[key] === '') {
				return false;
			}
			if (Object.keys(errors).length !== 0) {
				return false;
			}
		}
		return true;
	};

	const onBlur = (e) => {};

	const onSubmit = (e) => {
		e.preventDefault();
		sendData(getState());
	};
	const { email, password, confirmPassword } = getState();

	//передаем имя поля и новое значение
	const onChange = (event) => {
		updateState(event.target.name, event.target.value);
	};

	useEffect(() => {
		const currentErrors = validateValues(getState());
		setErrors(currentErrors);
	}, [email, password, confirmPassword]);

	useEffect(() => {
		setValidForm(checkValidForm());
	}, [email, password, confirmPassword, errors]);
	return (
		<div className={styles.app}>
			<form className={styles.formInput} onSubmit={onSubmit}>
				<h1>Регистрация</h1>
				{errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

				<input
					className={styles.input}
					type="email"
					name="email"
					value={email}
					placeholder="Введите email"
					onChange={onChange}
					onBlur={onBlur}
				/>
				{errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
				<input
					className={styles.input}
					type="password"
					name="password"
					value={password}
					placeholder="Введите пароль"
					onChange={onChange}
					onBlur={onBlur}
				/>
				{errors.confirmPassword && (
					<div style={{ color: 'red' }}>{errors.confirmPassword}</div>
				)}
				<input
					className={styles.input}
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					placeholder="Введите повторно пароль"
					onChange={onChange}
					onBlur={onBlur}
				/>
				<button disabled={!validForm} type="submit">
					Зарегестрироваться
				</button>
			</form>
		</div>
	);
};
