import React, { useState } from "react";
import ModalTerms from "../Modales/ModalTerms/ModalTerms";
import "./footer.css";

const Footer = () => {
	const [isOpenTerms, setIsOpenTerms] = useState(false);

	return (
		<section className="footer__container">
			{/* Terms & Conditions */}
			<div className="background__color_D display_center_center_column">
				<button
					type="button"
					className="underlined_yellow_terms"
					onClick={() => setIsOpenTerms(true)}
				>
					Click here to see the Terms & Conditions
				</button>
				<p className="disclaimer_text_footer">
					{" "}
					Crypto packages can be risky, purchase packages responsibly. <br />
					Powered by Etherscan.io APIs
				</p>
			</div>
			{/* LOGO */}
			<div className="background__color_L display_center_center_column">
				<div>
					<img
						src="./Assets/Logo Colores/Asset 26.svg"
						alt=""
						className="logo__edit"
					/>
				</div>
				<div>
					<p className="texto__logo__claro">
						Crypto
						<span className="texto__logo__oscuro">Program</span>
						.me
					</p>
				</div>
			</div>
			<ModalTerms
				titulo1={""}
				titulo2={""}
				open={isOpenTerms}
				close={() => setIsOpenTerms(false)}
				backbutton={true}
			/>
		</section>
	);
};

export default Footer;
