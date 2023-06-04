import React from "react";

import "./louding.css";

const Louding = () => {
	return (
		<div className="container__loading">
			<img
				src="Assets/Animaciones/Cargando/Loading.gif"
				alt=""
				className="gif__precarga"
			/>
		</div>
	);
};

export default Louding;
