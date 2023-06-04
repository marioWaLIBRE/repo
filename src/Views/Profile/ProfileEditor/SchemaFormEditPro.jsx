import * as yup from "yup";

export const schema = yup.object({
	firstname: yup
		.string()
		.matches(/^[A-Za-z ]*$/, "Only Letters Allowed")
		.max(25, "Only 25 Characters Allowed"),
	lastname: yup
		.string()
		.matches(/^[A-Za-z ]*$/, "Only Letters Allowed")
		.max(25, "Only 25 Characters Allowed"),
	username: yup
		.string()
		.matches(
			/^[A-Za-z0-9]{4,25}$/,
			"Only Letters And Numbers Allowed"
		)
		.min(4, "Minimum 4 Characters")
		.max(25, "Maximum 25 Characters"),
	token: yup
		.string("Invalid format")
		.required("Field is required")
		.min(6, "Token must have 6 characters")
		.max(6, "Token must have 6 characters"),
});
