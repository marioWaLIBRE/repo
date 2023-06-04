import "./subheader.css";

const Subheader = () => {
	return (
		<section className="subheader_container">
			{/* Header logo */}
			<div className="subheader_logo_container display_format-subheader">
				<a href="/">
					<img
						className="subheader_logo"
						src="./Assets/Logo Colores/Asset 28.svg"
						alt="Logo"
					/>
				</a>
			</div>
			{/* Divider */}
			<div className="display_format-subheader">
				<div className="line1__subheader"> </div>
			</div>
			{/* Header name */}
			<div className="display_format-subheader">
				<p className="name_program">
					<span className="color_oscuro">CRYPTO</span>
					<span className="color_claro">PROGRAM</span>
					<span className="color_oscuro">.ME</span>
				</p>
			</div>
		</section>
	);
};

export default Subheader;
