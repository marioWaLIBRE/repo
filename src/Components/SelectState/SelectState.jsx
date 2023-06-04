import React from "react";
import Select from "react-select";
import { statePackages } from "../../Share/Constants";

const SelectState = ({ ...props }) => {
	const options = [];

	options.push({ value: 0, label: "All States" });

	statePackages.forEach((packageState) => {
		options.push({
			value: packageState.id,
			label: packageState.name,
		});
	});

	const customStyles = {
		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? "black" : "gray",
			background: state.isSelected ? "#EAEAEA" : "white",
			padding: 10,
		}),
		control: () => ({
			// none of react-select's styles are passed to <Control />
			display: "flex",
			width: 130,
			background: "#ffffff00",
		}),
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = "opacity 300ms";
			return { ...provided, opacity, transition };
		},
	};

	return (
		<Select {...props} options={options} styles={customStyles} />
	);
};

export default SelectState;
