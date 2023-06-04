import * as yup from "yup";

export const schema = yup.object({
	firstname: yup
		.string()
		// .required()
		.matches(/^([\D])*(\s)*([\D])*$/, "Only Letters Allowed")
		.max(50, "Only 50 Characters Allowed"),
	lastname: yup
		.string()
		.max(50, "Only 50 Characters Allowed")
		.matches(/^([\D])*(\s)*([\D])*$/, "Only Letters Allowed"),
	email: yup.string().email().required(),
	emailConfirmation: yup
		.string()
		.email()
		.required()
		.oneOf([yup.ref("email"), null], "The E-mail Doesn't Match"),
	password: yup
		.string()
		.required()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
			"Use at least one uppercase letter, one lowercase letter, one number and one symbol"
		)
		.min(8, "Minimum 8 Characters"),
	passwordConfirmation: yup
		.string()
		.required()
		.oneOf([yup.ref("password"), null], "The passwords don't match"),
	referalCode: yup
		.string()
		.required("Referral code is required")
		// .matches(
		//   /^(?=.[A-Z])(?=.[0-9])(?=.\w)*$/,
		//   "El codigo de referencia solo debe tener letras y numeros"
		// )
		.max(8, "Maximum 8 Characters"),
});
