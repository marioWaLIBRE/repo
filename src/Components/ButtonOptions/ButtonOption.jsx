import React, { useEffect, useState } from "react";
import "./buttonoption.css";

const ButtonOption = ({
	children,
	action,
	selectedValue,
	buttonValue,
}) => {
	const [selectedValueChild, setSelectedValueChild] = useState(1);

	useEffect(() => {
		setSelectedValueChild(selectedValue);
	}, [selectedValue]);

	return (
		<div>
			<button
				className={
					selectedValueChild === buttonValue
						? "button_option_medium_active button_option_medium"
						: "button_option_medium"
				}
				type="submit"
				onClick={action}
			>
				{children}
			</button>
		</div>
	);
};

export default ButtonOption;
