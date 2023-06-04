import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bigbutton from "../../BigButtons/Bigbutton";
import ModalLogin from "../../Modales/ModalLogin/ModalLogin";
import ModalResetPwdCode from "../../Modales/ModalResetPwdCode/ModalResetPwdCode";
import ModalResetPwdEmail from "../../Modales/ModalResetPwdEmail/ModalResetPwdEmail";
import "./hero.css";

const Hero = ({ UserWalletsCount, UsersCount, homeHeroVideo }) => {
	/**
	 *
	 * CADA MODAL DEBE TENER SU PROPIO USESTATE
	 * Este useState es para el modalLogin
	 */
	const [isOpen, setIsOpen] = useState(false);

	/**
	 *
	 * Este useState es para el modalResestYourPassword
	 */
	const [isOpenMRP, setIsOpenMRP] = useState(false);

	/**
	 *
	 * Este useState es para el ModalResetPwdCode
	 */
	const [isOpenMRC, setIsOpenMRC] = useState(false);

	const navigate = useNavigate();

	/**
	 *
	 * CREO FUNCION PARA CERRAR MODAL LOGIN Y ABRA MODAL RESET YOUR PASSWORDS
	 */

	const resetYourPassword = () => {
		// PROBAR UNA PROMESA PARA OBLIGAR LA ESPERA DEL RENDERISADO
		setIsOpen(false);
		setIsOpenMRP(true);
	};

	/*
	Creación de constantes para el consumo de la api que me trae los totales de: días, usuarios y wallets
	*/
	return (
		<section className="hero_section_container_dad">
			<div className="hero_textVideoButtonsDatos_container">
				<div className="hero_textVideo_container display_center_center">
					<div className="hero_text_container display_column_center_center">
						<h1 className="title_hero">
							<span className="metallic_color-small span_hero">THE</span>
							<span className="green_color-small span_hero">BEST</span>
							<br />
							<span className="metallic_color-large span_hero">WAY</span>
							<span className="white_color span_hero">TO</span>
							<br />
							<span className="green_color-large span_hero">GROW YOUR</span>
							<br />
							<span className="metallic_color-large span_hero">CRYPTO</span>
						</h1>
						<div className="sub_container_texto_title_hero">
							<p>
								Create your account at Cryptoprogram.me to start{" "}
								<b>passively growing your crypto each month. </b>
							</p>
						</div>
					</div>
					<div className="hero_video_container display_center_center">
						<video
							src={homeHeroVideo}
							className="format_video_container_son"
							controls
						></video>
					</div>
				</div>
				<div className="hero_ButtonsDatos_container display">
					<div className="hero_buttons_container">
						<Bigbutton
							action={() => navigate("/register")}
							className="button_hero"
						>
							Register
						</Bigbutton>
						<Bigbutton className="button_hero" action={() => setIsOpen(true)}>
							Login
						</Bigbutton>
					</div>
					<div className="hero_datos_container">
						<div className="hero_data-users display">
							<img
								className="hero_data-logo"
								src="./Assets/Iconos/User.svg"
								alt=""
							/>
							<p className="data_number"> {UsersCount} </p>
							<p className="data_name"> REGISTERED USERS </p>
						</div>
						<div className="hero_data-wallets display">
							<img
								className="hero_data-logo"
								src="./Assets/Iconos/Wallet.svg"
								alt=""
							/>
							<p className="data_number"> {UserWalletsCount} </p>
							<p className="data_name"> REGISTERED WALLETS </p>
						</div>
						<div className="trapezoide_white"></div>
					</div>
				</div>
			</div>
			<ModalLogin
				titulo1={"LOGIN"}
				titulo2={" "}
				open={isOpen}
				close={() => setIsOpen(false)}
				backbutton={true}
				forget={resetYourPassword}
			/>
			<ModalResetPwdEmail
				titulo1={"RESET YOUR PASSWORD"}
				titulo2={" "}
				open={isOpenMRP}
				close={() => setIsOpenMRP(false)}
				backbutton={true}
				sendemail={setIsOpenMRC}
			/>
			<ModalResetPwdCode
				titulo1={"RESET YOUR PASSWORD"}
				titulo2={" "}
				open={isOpenMRC}
				close={() => setIsOpenMRC(false)}
				backbutton={true}
			/>
		</section>
	);
};

export default Hero;
