import React from "react";
import "./buttoncrud.css";

const ButtonCrud = ({ children, action, imagen }) => {
	return (
		<div>
			<button
				style={{
					backgroundImage: `url(${imagen})`,
					backgroundSize: "cover",
				}}
				className="button_crud_edit"
				type="submit"
				onClick={action}
			>
				{children}
			</button>
		</div>
	);
};

export default ButtonCrud;
