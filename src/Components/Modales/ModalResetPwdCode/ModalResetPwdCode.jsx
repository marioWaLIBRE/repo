import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	resetPasswordApi,
	resetYourPassApi,
} from "../../../Services/Loogin.api";
import { decodeBase64 } from "../../../Share/functions";
import Bigbutton from "../../BigButtons/Bigbutton";
import Input from "../../Input/Input";
import Louding from "../../Louding/Louding";
import Modal from "../Modal/Modal";

import "./modalresetpwdcode.css";
import { schema } from "./SchemaFormResetPwd";

const ModalResetPwdCode = ({ open, close, titulo1, titulo2, backbutton }) => {
	/**
	 *
	 *Se crea el useState para el louding button change password
	 */
	const [louding, setLouding] = useState(false);

	/**
	 *
	 *Se crea el useState para el louding button resend your code
	 */
	const [resetLouding, setResetLouding] = useState(false);

	/**
	 *
	 * Se crea el useState para reenviar el correo y la informacion optenida dentro del formulario
	 */
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onBlur",
	});
	/**
	 *
	 * Funcion para consumir resetYourPassApi
	 */
	const consumoResetPasswordApi = (data) => {
		setLouding(true);
		let emailCodification = decodeBase64(sessionStorage.getItem("email"));
		let body = {
			email: emailCodification,
			token: data.resedcode,
			newPassword: data.confirmpassword,
		};
		resetPasswordApi(body)
			.then((response) => {
				if (response.status === 200) {
					close();
					alert(response.data.message);
				}
				setLouding(false);
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
				alert("The password could not be updated, please try again");
				setLouding(false);
			});
	};

	/**
	 *
	 * Funcion para consumir resetYourPassApi
	 */
	const sendEmailApi = () => {
		setResetLouding(true);
		let emailCodification = decodeBase64(sessionStorage.getItem("email"));
		let body = { email: emailCodification };
		resetYourPassApi(body)
			.then((response) => {
				if (response.status === 200) {
					alert("Check your email and wait a few minutes.");
				}
				setResetLouding(false);
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
				alert("Could not send the code to the mail, try again.");
				setResetLouding(false);
			});
	};

	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="grid_modal_resetpwdcode">
				<div className="resetpwdcode_code ">
					<div className="title_resetpwdcode display_center_right">
						<label className="label_modal_resetpwdcode" htmlFor="">
							Enter email code here
						</label>
					</div>
					<div className="display_center_right">
						<input
							name="resedcode"
							className="input_modal_resetpwdcode"
							type="text"
							{...register("resedcode")}
						/>
					</div>
					<div className="display_center_left">
						{resetLouding ? (
							<Louding />
						) : (
							<button
								onClick={sendEmailApi}
								className="link_modal_resetpwdcode"
							>
								Resend code
							</button>
						)}
					</div>
				</div>
				<div className="display_center_top">
					<Input
						name={"password"}
						label={"Enter new password"}
						type={"password"}
						placeholder={""}
						forid={"Password"}
						{...register("password")}
						error={errors.password && errors.password.message}
					></Input>
				</div>
				<div className="confirm_pwd_reset_code display_center_top">
					<Input
						name={"confirmpassword"}
						label={"Confirm new password"}
						type={"password"}
						placeholder={""}
						forid={"ConfirmPassword"}
						{...register("confirmpassword")}
						error={errors.confirmpassword && errors.confirmpassword.message}
					></Input>
				</div>
				<div className="display">
					<p className="texto__modal_resetpwdcode">
						Password must have between 8 and 16 characters. Use at least one
						uppercase letter, one lowercase letter, one number and one symbol.
					</p>
				</div>
				<div className="button_big_modal display">
					{louding ? (
						<Louding />
					) : (
						<Bigbutton action={handleSubmit(consumoResetPasswordApi)}>
							Change password
						</Bigbutton>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default ModalResetPwdCode;
