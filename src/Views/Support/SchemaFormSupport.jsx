import * as yup from "yup";

export const schema = yup.object({
	fullNameSupport: yup
		.string()
		.required("Full name is required")
		.matches(/^([\D])*(\s)*([\D])*$/, "Only Letters Allowed")
		.max(200, "Only 200 Characters Allowed"),
	subjectSupport: yup
		.string()
		.required("Subject is required")
		.max(1000, "Only 200 Characters Allowed"),
	emailSupport: yup
		.string()
		.email("Email must be a valid email")
		.required("Email is required"),
	// descriptionSupport: yup.required("Description required"),
});
