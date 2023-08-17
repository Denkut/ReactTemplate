import { useState } from "react";

//начальное состояние
const initialState = {
	email: '',
	password: '',
	confirmPassword: '',
};
//свой хук
export const useStore = () => {
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
		resetState: () => {
			setState(initialState);
		},
	};
};