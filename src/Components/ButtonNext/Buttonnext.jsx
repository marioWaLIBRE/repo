import "./buttonnext.css";

const Buttonnext = ({ action, ...props }) => {
	return (
		<div className={"button__back " + props.className ?? ""}>
			<button onClick={action} className="button__backimg">
				<img
					src="./Assets/Iconos/Next.svg"
					alt=""
					className="logo__button__back"
				/>
			</button>
		</div>
	);
};

export default Buttonnext;
