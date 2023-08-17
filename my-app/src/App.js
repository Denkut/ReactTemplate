/* eslint-disable */
import { useEffect, useState, useRef } from 'react';
import styles from './App.module.css';
import { useStore } from './hooks/useStore';

const emailRegex =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordRegex =
	/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

//передача в консоль
const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState, resetState } = useStore('');
	const [errors, setErrors] = useState({});
	const [validForm, setValidForm] = useState(false);

	const submitButtonRef = useRef(null);

	//Валидация формы
	const validateValues = (inputValues) => {
		let errors = {};
		// console.log('validateValues', inputValues);
		if (inputValues.email.length > 0 && !emailRegex.test(inputValues.email)) {
			errors.email = 'Некоректный Email';
		}
		if (
			inputValues.password.length > 0 &&
			!passwordRegex.test(inputValues.password)
		) {
			errors.password =
				'В пароле должно быть от 6-20 символов и включать в себя хотя бы: 1 букву, 1 специальный символ, одну цифру';
		}
		if (
			inputValues.confirmPassword.length !== inputValues.password.length &&
			inputValues.confirmPassword !== inputValues.password
		) {
			errors.confirmPassword = 'Пароль должен совпадать';
		}
		return errors;
	};
	//Проверка на валидность формы
	const checkValidForm = () => {
		const form = getState();
		for (const key in form) {
			if (form[key] === '') {
				return false;
			}
		}
		if (Object.keys(errors).length !== 0) {
			return false;
		}
		// debugger;
		return true;
	};

	const onBlur = (e) => {};

	const onSubmit = (e) => {
		e.preventDefault();
		sendData(getState());
		resetState();
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
	}, [errors]);

	useEffect(() => {
		if (validForm) {
			submitButtonRef.current.focus();
		}
	}, [validForm]);

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
				<button ref={submitButtonRef} type="submit" disabled={!validForm}>
					Зарегестрироваться
				</button>
			</form>
		</div>
	);
};
