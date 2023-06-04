import React from "react";
import Select from "react-select";

const Selects = ({ options, ...props }) => {
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
			maxWidth: 250,
			width: 230,
			minWidth: 160,
			height: 30,
			background: "#176c7710",
			borderRadius: "10px",
		}),
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = "opacity 300ms";

			return { ...provided, opacity, transition };
		},
	};

	return <Select {...props} options={options} styles={customStyles} />;
};

export default Selects;
