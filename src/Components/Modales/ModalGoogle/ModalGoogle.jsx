import React from "react";
import { useState } from "react";
import { qrValidate } from "../../../Services/Loogin.api";
import { decodeBase64 } from "../../../Share/functions";
import Modal from "../Modal/Modal";
import "./modalgoogle.css";

const ModalGoogle = ({
	open,
	close,
	titulo1,
	titulo2,
	backbutton,
	openNewModal,
}) => {
	const [code, setCode] = useState("");

	const submitAuto = (code) => {
		let emailCodification = decodeBase64(sessionStorage.getItem("id"));
		let data = {
			email: emailCodification,
			token: code,
		};
		qrValidate(data)
			.then((response) => {
				if (response.data.verified) {
					setCode("");
					openNewModal();
				} else {
					alert("Code invalid or expired");
				}
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
				setCode("");
			});
	};

	const clearModalGoogle = () => {
		setCode("");
		close();
	};

	return (
		<Modal
			open={open}
			close={clearModalGoogle}
			titulo1={titulo1}
			titulo2={titulo2}
			backbutton={backbutton}
		>
			<section className="grid__modal_google">
				<div className="CMG__ubication">
					<h2 className="titulo__modal__google">CONFIRMATION CODE</h2>
					<br />
					<div className="text__modal__google_container">
						<h3 className="text__modal__google">
							Check your Authenticator, copy and paste the code
						</h3>
					</div>
				</div>
				<div className="CMG__ubication">
					<div className="contenedor__modal__google">
						<input
							className="imput__modal__google"
							type="text"
							maxLength="6"
							value={code}
							onChange={(e) => {
								setCode(e.target.value);
								if (e.target.value.length === 6) {
									submitAuto(e.target.value);
									document.getElementsByClassName(
										"imput__modal__google"
									)[0].value = "";
									setCode("");
								}
							}}
						/>
					</div>
				</div>
			</section>
		</Modal>
	);
};

export default ModalGoogle;
