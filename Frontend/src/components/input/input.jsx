/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../constants';

export const Input = forwardRef(({ label, error, ...props }, ref) => {
	return (
		<div className="mb-4">
			<label
				className="mb-2 block text-sm font-bold text-gray-700"
				htmlFor={label}
			>
				{label}
			</label>
			<input
				className={`appearance-none border shadow ${
					error ? 'border-red-500' : ''
				} focus:shadow-outline mb-3 w-full rounded px-3 py-2 leading-tight text-gray-700 focus:outline-none`}
				{...props}
				ref={ref}
			/>
		</div>
	);
});

Input.propTypes = {
	label: PropTypes.string,
	error: PROP_TYPE.ERROR,
};
