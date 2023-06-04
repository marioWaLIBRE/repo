import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../../Components/Input/Input";
import Layoutmu from "../../../Components/Layouts/LayoutMU/Layoutmu";
import Smallbutton from "../../../Components/SmallButtons/Smallbutton";
import "./password.css";
import { schema } from "./SchemaFormEditPass";
import { useState } from "react";
import { updatedPasswordApi } from "../../../Services/Profile.api";
import { decodeBase64 } from "../../../Share/functions";

const Password = () => {
	const [loading, setLoading] = useState(false);
	/**
	 *
	 * No creo use efect por que no se precarga, se envia cuando se realice una accion.
	 * Creamos funcion del put para pasar el consumo de apis de updatedPasswordApi
	 */

	const updatePassword = (data) => {
		setLoading(true);
		let emailCodification = decodeBase64(sessionStorage.getItem("id"));
		let body = {
			email: emailCodification,
			password: data.lastpassword,
			newPassword: data.confirmpassword,
		};
		isValid &&
			updatedPasswordApi(body)
				.then((response) => {
					setLoading(false);
					alert(response.data.message);
					navigate("/profile");
				})
				.catch((e) => {
					setLoading(false);
					console.log("Error: ", e.response?.data);
					if (e.response?.data.message) {
						alert(e.response?.data.message);
					}
				});
	};

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onBlur",
	});

	return (
		<Layoutmu loading={loading}>
			<div className="dad__container__grid__editpasspro">
				<div className="container__grid__editpasspro">
					<form>
						<div className="primer__parte__editpasspro editpasspro__grid">
							<div className="editpasspro__flex">
								<p className="editpass_text">
									Password must have between 8 and 16 characters. Use at least
									one uppercase letter, one lowercase letter, one number and one
									symbol.
								</p>
							</div>
							<div className="editpasspro__flex">
								<Input
									label={"Last password"}
									type={"password"}
									placehoder={""}
									forid={"lastpassword"}
									{...register("lastpassword")}
									error={errors.lastpassword && errors.lastpassword.message}
								></Input>
							</div>
						</div>
						<div className="segudan__parte__editpasspro__grid editpasspro__grid">
							<div className="editpasspro__flex">
								<Input
									label={"New password"}
									type={"password"}
									placehoder={""}
									forid={"newpassword"}
									{...register("newpassword")}
									error={errors.newpassword && errors.newpassword.message}
								></Input>
							</div>
							<div className="editpasspro__flex">
								<Input
									label={"Confirm password"}
									type={"password"}
									placehoder={""}
									forid={"confirmpassword"}
									{...register("confirmpassword")}
									error={
										errors.confirmpassword && errors.confirmpassword.message
									}
								></Input>
							</div>
							<div className="editpasspro__flex"></div>
							<div className="editpasspro__flex"></div>
						</div>
						<div className="tercer__parte__editpasspro_button">
							<Smallbutton action={() => navigate("/profile")}>
								Cancel
							</Smallbutton>
							<Smallbutton action={handleSubmit(updatePassword)}>
								Ok
							</Smallbutton>
						</div>
					</form>
				</div>
			</div>
		</Layoutmu>
	);
};

export default Password;
