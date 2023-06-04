import * as yup from "yup";

export const schema = yup.object({
	password: yup
		.string()
		.required()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
			"Use at least one uppercase letter, one lowercase letter, one number and one symbol"
		)
		.min(8, "Minimum 8 characters"),
});
