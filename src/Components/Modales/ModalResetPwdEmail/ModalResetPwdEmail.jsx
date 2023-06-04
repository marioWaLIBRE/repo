import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetYourPassApi } from "../../../Services/Loogin.api";
import Bigbutton from "../../BigButtons/Bigbutton";
import Input from "../../Input/Input";
import Louding from "../../Louding/Louding";
import Modal from "../Modal/Modal";

import { schema } from "./SchemaForModalResetPwdEmail";

import "./modalresetpwdemail.css";
import { encodeBase64 } from "../../../Share/functions";

const ModalResetPwdEmail = ({
	open,
	close,
	titulo1,
	titulo2,
	backbutton,
	sendemail,
}) => {
	/**
	 *
	 *Se crea el useState para el louding
	 */
	const [louding, setLouding] = useState(false);

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
	const sendEmailApi = (data) => {
		setLouding(true);
		resetYourPassApi(data)
			.then((response) => {
				if (response.status === 200) {
					let emailCodification = encodeBase64(data.email);
					sessionStorage.setItem("email", emailCodification);
					sendemail(true);
					close();
					alert(
						"Check your email and wait a few minutes. Maybe check your spam folder"
					);
				}
				setLouding(false);
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					let emailCodification = encodeBase64(data.email);
					sessionStorage.setItem("email", emailCodification);
					sendemail(true);
					close();
					alert(e.response?.data.message);
				}
				alert("Could not send the code to the mail, try again");
				setLouding(false);
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
			<div className="grid_modal_resetpwdemail">
				<div className="display">
					<Input
						label={"Enter your email"}
						type={"email"}
						placeholder={""}
						forid={"Email"}
						{...register("email")}
						error={errors.email && errors.email.message}
					></Input>
				</div>
				<div className="display">
					<p className="texto__modal_resetpwdemail">
						If the account exists: <br />
						You should receive an email with a code to reset your password
					</p>
				</div>
				<div className="display">
					{louding ? (
						<Louding />
					) : (
						<Bigbutton action={handleSubmit(sendEmailApi)}>Send</Bigbutton>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default ModalResetPwdEmail;
