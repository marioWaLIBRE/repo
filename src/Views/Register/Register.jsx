import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Bigbutton from "../../Components/BigButtons/Bigbutton";
import Input from "../../Components/Input/Input";
import { useForm } from "react-hook-form";
import "./register.css";
import Buttonback from "../../Components/ButtonBack/Buttonback";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../Register/SchemaFormRegister";
import Subheader from "../../Components/Subheader/Subheader";
import { registerUserApi } from "../../Services/Register.api";
import ModalTerms from "../../Components/Modales/ModalTerms/ModalTerms";
import Louding from "../../Components/Louding/Louding";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
		watch,
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onBlur",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			referalCode: "",
		},
	});
	const [isOpenTerms, setIsOpenTerms] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [referralValue, setReferralValue] = useState("");
	const navigate = useNavigate();
	const watchCheckbox = watch("showBotton", false);
	const [searchParams, setSearchParams] = useSearchParams();

	const onSubmit = (data) => {
		registerUser(data);
		// navigate("/home");
	};

	const [loading, setLoading] = useState(false);
	// function delay(time) {
	// 	return new Promise( res => setTimeout(res, time) );
	// }
	/**
	 *
	 * Función para registrar un nuevo usuario
	 * @param {Array} data Es un dato tipo array su base es defaultValues de useForm
	 */
	const registerUser = (data) => {
		//Activar loading
		setLoading(true);
		// await delay(2000);
		let body = {
			firstName: data.firstname,
			lastName: data.lastname,
			email: data.email,
			password: data.password,
		};
		if (data.referalCode && data.referalCode.length > 0) {
			body.referredCode = data.referalCode;
		}
		registerUserApi(body)
			.then((res) => {
				alert(res.data.message);
				navigate("/");
			})
			.catch((e) => {
				setLoading(false);
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			})
			.finally(() => {
				//Descativar loading
				setLoading(false);
			});
	};

	let referralCodeFromUrl = sessionStorage.getItem("referralCode") ?? "";

	const validateReferral = () => {
		const referralCodeFromUrlRegister = searchParams.get("referralCode") ?? "";
		if (referralCodeFromUrlRegister !== "") {
			sessionStorage.setItem("referralCode", referralCodeFromUrlRegister);
			referralCodeFromUrl = referralCodeFromUrlRegister;
		}
		if (referralCodeFromUrl !== "") {
			setReferralValue(referralCodeFromUrl);
			setValue(`referalCode`, referralCodeFromUrl);
		}
	};
	//No colocar parámetros dentro de las [] a menos que sean useState para así evitar ciclos infinitos.
	useEffect(() => {
		validateReferral();
	}, []);

	return loading ? (
		<Louding />
	) : (
		<section className="register_container">
			<div className="subheader_register display_left_center">
				<Subheader />
			</div>
			<div className="subheader_register_title_name_register display_down_center">
				<h1>REGISTER</h1>
			</div>
			<form>
				<div className="buttonBack_register">
					<Buttonback
						action={() => navigate("/")}
						className="buttonback_register"
					/>
				</div>
				<div className="register_form">
					<div className="form1">
						<div className="form1_input">
							<Input
								label={"First name"}
								type={"text"}
								placeholder={""}
								forid={"firstname"}
								{...register("firstname")}
								error={errors.firstname && errors.firstname.message}
							/>
						</div>
					</div>
					<div className="form2">
						<div className="form2_input">
							<Input
								label={"Last name"}
								type={"text"}
								placeholder={""}
								forid={"lastname"}
								{...register("lastname")}
								error={errors.lastname && errors.lastname.message}
							/>
						</div>
					</div>
					<div className="form3">
						<div className="form3_input">
							<Input
								label={"Email"}
								type={"email"}
								placeholder={""}
								forid={"email"}
								{...register("email")}
								error={errors.email && errors.email.message}
							/>
						</div>
					</div>
					<div className="form4">
						<div className="form4_input">
							<Input
								label={"Confirm email"}
								type={"email"}
								placeholder={""}
								forid={"emailconfirmError"}
								{...register("emailConfirmation")}
								error={
									errors.emailConfirmation && errors.emailConfirmation.message
								}
							/>
						</div>
					</div>
					<div className="form5">
						<div className="pass1">
							<label className="pass_label" htmlFor="pass">
								Password
							</label>
							<div className="register_pwd-container">
								<div className="reg_input">
									<input
										className="pass_reg"
										type={showPass ? "text" : "password"}
										name="password"
										placeholder=""
										required="required"
										id="pwd"
										{...register("password")}
									/>
									<p style={{ color: "red", fontSize: "12px" }}>
										{errors.password && errors.password.message}
									</p>
								</div>
								<div
									className="pwd_icon-container display"
									onClick={() => setShowPass(!showPass)}
								>
									{showPass ? (
										<img
											className="pwd_icon-register"
											src="./Assets/Iconos/View_password.svg"
											alt="open eye"
										/>
									) : (
										<img
											className="pwd_icon-register"
											src="./Assets/Iconos/close_eye.png"
											alt="close eye"
										/>
									)}
								</div>
							</div>
						</div>
						<div className="pass2">
							<label
								className="pass_label pass_label-confirm"
								htmlFor="conf_pass"
							>
								Confirm password
							</label>
							<div className="reg_input">
								<input
									className="pass_reg"
									type="password"
									name="confirm_password"
									placeholder=""
									{...register("passwordConfirmation")}
								/>
								<p style={{ color: "red", fontSize: "12px" }}>
									{errors.passwordConfirmation &&
										errors.passwordConfirmation.message}
								</p>
							</div>
						</div>
					</div>
					<div className="form6">
						<div className="form6_input">
							<Input
								label={"Referral code"}
								type={"text"}
								placeholder={""}
								forid={"referralcode"}
								{...register("referalCode")}
								error={errors.referalCode && errors.referalCode.message}
								onChange={(e) => setReferralValue(e.target.value)}
								value={referralValue}
								{...(referralCodeFromUrl !== ""
									? { disabled: true }
									: { disabled: false })}
							/>
						</div>
					</div>
				</div>
				{/* </div> */}

				<br />
			</form>

			<div className="terms__button__register">
				<div className="terms__register display">
					<div className="checkbox_terms display">
						<input
							className="checkbox_terms_input"
							type="checkbox"
							name="terms"
							value="terms"
							{...register("showBotton")}
						/>
					</div>
					<p className="agree" htmlFor="terms">
						<b> I have read and agreed </b> to the Terms & Conditions
						<button
							type="button"
							className="underlined_yellow"
							onClick={() => setIsOpenTerms(true)}
						>
							<em> Read here </em>
						</button>
					</p>
				</div>
				{isValid && isDirty && watchCheckbox && (
					<div className="button_form display">
						<Bigbutton action={handleSubmit(onSubmit)}>Register</Bigbutton>
					</div>
				)}
			</div>
			<ModalTerms
				titulo1={""}
				titulo2={""}
				open={isOpenTerms}
				close={() => setIsOpenTerms(false)}
				backbutton={true}
			/>
		</section>
	);
};

export default Register;
