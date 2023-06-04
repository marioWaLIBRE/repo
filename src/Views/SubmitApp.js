import React from "react";
import { useForm } from "react-hook-form";

const SubmitApp = () => {
	// handle events
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	// handle submit
	const onSubmit = (data) => alert(JSON.stringify(data));

	// watch events
	const company = watch("company");
	const fullName = watch("fullName");

	// handle disabled submit
	const isValid = company && fullName;

	return (
		<React.Fragment>
			<section>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="bg-white w-auto h-auto pb-10 mt-20 mx-5 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
						{/* header section */}
						<div className="h-28 flex justify-center items-center shadow">
							<p className="uppercase font-bold text-4xl text-center">
								Disable submit
							</p>
						</div>

						{/* body section */}
						<div>
							<div className="mx-5 mt-14 space-y-8">
								<div>
									<input
										type="text"
										placeholder="Company"
										className={`w-full h-16 text-4xl rounded-lg ${
											errors.company &&
											" focus:border-red-500 focus:ring-red-500 border-red-500"
										}`}
										{...register("company", {
											required: {
												value: true,
												message: "Company name is required",
											},
											minLength: {
												value: 3,
												message: "Please enter your company name",
											},
											maxLength: {
												value: 20,
												message: "Maximum allowed length is 20 characters ",
											},
											pattern: {
												value: /[a-zA-Z]+/,
												message: "Please enter only alphabets",
											},
										})}
									/>
									<div>
										{errors.company && (
											<span className="text-sm text-red-500">
												{errors.company.message}
											</span>
										)}
									</div>
								</div>
								<div>
									<input
										type="text"
										placeholder="Full name"
										className={`w-full h-16 text-4xl rounded-lg ${
											errors.fullName &&
											" focus:border-red-500 focus:ring-red-500 border-red-500"
										}`}
										{...register("fullName", {
											required: {
												value: true,
												message: "Full name is required",
											},
											minLength: {
												value: 3,
												message: "Please enter your company name",
											},
											maxLength: {
												value: 20,
												message: "Maximum allowed length is 20 characters ",
											},
											pattern: {
												value: /[a-zA-Z]+/,
												message: "Please enter only alphabets",
											},
										})}
									/>
									<div>
										{errors.fullName && (
											<span className="text-sm text-red-500">
												{errors.fullName.message}
											</span>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* submit section */}
						<div className="flex justify-center mt-12">
							<input
								type="submit"
								value="Submit"
								className={`w-2/5 h-10 bg-pink-200 font-bold text-white ${
									isValid && "bg-pink-500"
								}`}
								disabled={!isValid}
							/>
						</div>
					</div>
				</form>
			</section>
		</React.Fragment>
	);
};

export default SubmitApp;
