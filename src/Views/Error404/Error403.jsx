import React from "react";
import { useNavigate } from "react-router-dom";
import Bigbutton from "../../Components/BigButtons/Bigbutton";
import Subheader from "../../Components/Subheader/Subheader";
import "./error404.css";

const Error403 = () => {
	const navigate = useNavigate();
	const validated = JSON.parse(sessionStorage.getItem("validated"));

	const navegationProfileHome = () => {
		if (validated) {
			navigate("/packages");
		} else {
			navigate("/");
		}
	};

	return (
		<div className="background__404">
			<Subheader />
			<div className="tamaño__contenedor__404">
				<div className="flex__container__404">
					<img
						src="./Assets/Iconos/403_Not_Found.svg"
						alt=""
						className="img__error__404"
					/>
				</div>
				<div className="flex__container__404">
					<p className="texto__404">
						We are Sorry...
						<span className="texto1__404">
							The page you're trying to access has restricted access.
						</span>
					</p>
				</div>
				<div className="flex__container__404">
					<Bigbutton action={navegationProfileHome}>
						LET'S GO BACK
					</Bigbutton>
				</div>
			</div>
		</div>
	);
};

export default Error403;
