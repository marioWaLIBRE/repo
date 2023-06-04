import "./buttonback.css";

const Buttonback = ({ action, ...props }) => {
	return (
		<div className={"button__back " + props.className ?? ""}>
			<button onClick={action} className="button__backimg">
				<img
					src="./Assets/Iconos/Back.svg"
					alt=""
					className="logo__button__back"
				/>
			</button>
		</div>
	);
};

export default Buttonback;
