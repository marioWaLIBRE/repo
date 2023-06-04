import * as yup from "yup";

export const schema = yup.object({
	email: yup.string().email("Invalid E-mail").required(),
	password: yup.string().required(),
});
