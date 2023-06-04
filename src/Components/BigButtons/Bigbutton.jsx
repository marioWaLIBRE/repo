import "./bigbutton.css";

const Bigbutton = ({ children, action }) => {
	return (
		<div>
			<button
				className="edit__button__big"
				type="submit"
				onClick={action}
			>
				{children}
			</button>
		</div>
	);
};

export default Bigbutton;

// const Bigbutton = ({ children, action, enabled = true }) => {
// 	return (
// 		<div>
// 			<button
// 				className= {enabled ? "edit__button__big" : "edit__button__big__disabled"}
// 				type="submit"
// 				onClick={enabled ? action : {}}
// 			>
// 				{children}
// 			</button>
// 		</div>
// 	);
// };
