import React from "react";
import { useNavigate } from "react-router-dom";
import BigButton from "../../Components/BigButtons/Bigbutton";
import Subheader from "../../Components/Subheader/Subheader";
import "./error404.css";

const Error404 = () => {
	const navigate = useNavigate();
	return (
		<div className="background__404">
			<Subheader />
			<div className="tamaño__contenedor__404">
				<div className="flex__container__404">
					<img
						src="./Assets/Iconos/404_Not_Found.svg"
						alt=""
						className="img__error__404"
					/>
				</div>
				<div className="flex__container__404">
					<p className="texto__404">
						Oops.
						<span className="texto1__404">
							The page you were looking for doesn't exist.
						</span>
					</p>
				</div>
				<div className="flex__container__404">
					<BigButton action={() => navigate(-1)}>
						LET'S GO BACK
					</BigButton>
				</div>
			</div>
		</div>
	);
};

export default Error404;
