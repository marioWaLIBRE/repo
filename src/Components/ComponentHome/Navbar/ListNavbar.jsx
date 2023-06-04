import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../../Modales/ModalLogin/ModalLogin";
import ModalResetPwdCode from "../../Modales/ModalResetPwdCode/ModalResetPwdCode";
import ModalResetPwdEmail from "../../Modales/ModalResetPwdEmail/ModalResetPwdEmail";
// import "./navbar.css";
// import "../Hero/hero.css";

const ListNavbar = ({ setActiveAboutSlide, setClick }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenMRP, setIsOpenMRP] = useState(false);
	const [isOpenMRC, setIsOpenMRC] = useState(false);

	const resetYourPassword = () => {
		// PROBAR UNA PROMESA PARA OBLIGAR LA ESPERA DEL RENDERISADO
		setIsOpen(false);
		setIsOpenMRP(true);
	};
	const closeMenu = () => setClick(false);
	const navigate = useNavigate();

	return (
		<section className="list_option_navbar_container_dad">
			<ul className="list_option_navbar_container">
				<li className="nav-item">
					<a
						href="/"
						onClick={() => {
							closeMenu();
						}}
					>
						<img
							className="subheader_logo_navbar"
							src="./Assets/Logo Colores/Asset 31.svg"
							alt="Logo"
						/>
					</a>
				</li>
				<li className="nav-item">
					<a
						href="#about"
						onClick={() => {
							closeMenu();
							setActiveAboutSlide(0);
						}}
					>
						WHO WE ARE
					</a>
				</li>
				<li className="nav-item">
					<a href="#invest" onClick={closeMenu}>
						HOW IT WORKS
					</a>
				</li>
				<li className="nav-item">
					<a
						href="#about"
						onClick={() => {
							closeMenu();
							setActiveAboutSlide(1);
						}}
					>
						REFERRAL PROGRAM
					</a>
				</li>
				<li className="nav-item">
					<a href="#testimonials" onClick={closeMenu}>
						TESTIMONIALS
					</a>
				</li>
				<li className="nav-item">
					<a href="" onClick={() => navigate("/frequentQuestions-public")}>
						FAQ
					</a>
				</li>
				<li className="nav-item color_login_register">
					<p className="login_register_buttons" onClick={() => setIsOpen(true)}>
						LOGIN
					</p>
				</li>
				<li className="nav-item color_login_register">
					<p
						className="login_register_buttons"
						onClick={() => navigate("/register")}
					>
						REGISTER
					</p>
				</li>
			</ul>
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

export default ListNavbar;
