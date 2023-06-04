import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Bigbutton from "../../BigButtons/Bigbutton";
import Input from "../../Input/Input";
import Modal from "../Modal/Modal";
import { schema } from "./SchemaFormLogin";
import { login } from "../../../Services/Loogin.api";
import "./modallogin.css";
import { encodeBase64 } from "../../../Share/functions";
// import ModalResetPwdEmail from "../ModalResetPwdEmail/ModalResetPwdEmail";

const ModalLogin = ({ open, close, titulo1, titulo2, backbutton, forget }) => {
	const navigate = useNavigate();
	/**
	 *
	 * La función consume el api de login para ingresar a la vista profile,
	 * se guarda variables en session storage para validar el usuario
	 * @param {Array} data {email:ejemplo@htomail.com password:11}
	 */

	// function delay(time) {
	// 	return new Promise((res) => setTimeout(res, time));
	// }

	const startSession = async (data) => {
		await login(data)
			.then((res) => {
				if (res.status === 200) {
					let emailCodification = encodeBase64(data.email);
					sessionStorage.setItem("id", emailCodification);
					if (res.data.UsersCliWallets === 0) {
						navigate("/codeqr?params=profile");
					} else {
						navigate("/codeqr?params=packages");
					}
				} else {
					alert(res.data.message);
				}
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	const enterStartSession = (event) => {
		let data = {
			email: getValues("email"),
			password: getValues("password"),
		};
		if (event.key === "Enter") {
			login(data)
				.then((res) => {
					if (res.status === 200) {
						let emailCodification = encodeBase64(data.email);
						sessionStorage.setItem("id", emailCodification);
						navigate("/codeqr?params=packages");
					} else {
						alert(res.data.message);
					}
				})
				.catch((e) => {
					console.log("Error: ", e.response?.data);
					if (e.response?.data.message) {
						alert(e.response?.data.message);
					}
				});
		}
	};

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onBlur",
	});

	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="modalgrid__login">
				<form className="modalform__grid__login">
					<div className="modalflex__login">
						<Input
							label={"Email"}
							type={"email"}
							placeholder={""}
							forid={"Email"}
							{...register("email")}
							error={errors.email && errors.email.message}
						></Input>
					</div>
					<div className="modalflex__login">
						<Input
							label={"Password"}
							type={"password"}
							placeholder={""}
							forid={"Password"}
							onKeyDown={enterStartSession}
							{...register("password")}
							error={errors.password && errors.password.message}
						></Input>
					</div>
				</form>
				<div className="modalbutton_hero">
					<Bigbutton action={handleSubmit(startSession)}>Login</Bigbutton>
				</div>
				<div className="modalflex__login">
					<button onClick={forget} className="button__forget__ml">
						<span className="texto__button__forget__ml">
							<em> I forgot my password </em>
						</span>
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ModalLogin;
