/* eslint-disable */
import { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import { passwordRegex } from './utils/regex';

//передача в консоль
const sendData = (formData) => {
	console.log(formData);
};

const fieldsScheme = yup.object().shape({
	email: yup.string().email('Некоректный Email').required('Укажите email!'),
	password: yup
		.string()
		.matches(
			passwordRegex,
			'В пароле должно быть от 6-20 символов и включать в себя хотя бы: 1 букву, 1 специальный символ, одну цифру',
		)
		.required('Укажите пароль!'),
	confirmPassword: yup
		.string()
		.required('Повторите пароль!')
		.oneOf([yup.ref('password')], 'Пароли должны совпадать!'),
});

export const App = () => {
	const submitButtonRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(fieldsScheme),
		mode: 'onBlur',
	});

	const onSubmit = (data) => {
		sendData(data);
	};

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus();
		}
	}, [isValid]);

	return (
		<div className={styles.app}>
			<form className={styles.formInput} onSubmit={handleSubmit(onSubmit)}>
				<h1>Регистрация</h1>
				{errors.email && (
					<div style={{ color: 'red' }}>{errors.email.message}</div>
				)}

				<input
					className={styles.input}
					type="email"
					{...register('email')}
					placeholder="Введите email"
				/>
				{errors.password && (
					<div style={{ color: 'red' }}>{errors.password.message}</div>
				)}
				<input
					className={styles.input}
					type="password"
					{...register('password')}
					placeholder="Введите пароль"
				/>
				{errors.confirmPassword && (
					<div style={{ color: 'red' }}>{errors.confirmPassword.message}</div>
				)}
				<input
					className={styles.input}
					type="password"
					{...register('confirmPassword')}
					placeholder="Введите повторно пароль"
				/>
				<button type="submit" ref={submitButtonRef} disabled={!isValid}>
					Зарегестрироваться
				</button>
			</form>
		</div>
	);
};
