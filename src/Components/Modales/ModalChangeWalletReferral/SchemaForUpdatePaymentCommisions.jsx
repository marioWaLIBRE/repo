import * as yup from "yup";

export const schema = yup.object({
	token: yup
		.string("Invalid format")
		.required("Field is required")
		.min(6, "Token must have 6 characters")
		.max(6, "Token must have 6 characters"),
});
