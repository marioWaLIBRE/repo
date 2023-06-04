import React from "react";

import "./input.css";

const Input = React.forwardRef(
	({ label, type, placehoder, forid, error, ...props }, ref) => {
		return (
			<div className="dad__label__container">
				<div className="label__container">
					<label className="edit__label__label" htmlFor={forid}>
						{label}
					</label>
					<input
						ref={ref}
						{...props}
						type={type}
						placeholder={placehoder}
						className="edit__input__label"
						id={forid}
					/>
					<div className="error_inputs_globales_container">
						{error}
					</div>
				</div>
			</div>
		);
	}
);

export default Input;
