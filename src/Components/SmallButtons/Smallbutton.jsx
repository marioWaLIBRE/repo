import "./smallbutton.css";

const Smallbutton = ({ children, action, classbutton, ...props }) => {
	return (
		<div className="small__button">
			<button
				className={`edit__button__small ${classbutton}`}
				type="button"
				{...props}
				onClick={action}
			>
				{children}
			</button>
		</div>
	);
};

export default Smallbutton;
