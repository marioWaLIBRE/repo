import React from "react";
import Bigbutton from "../../BigButtons/Bigbutton";

import "./invest.css";

const Invest = () => {
	const closeMenu = () => {
		alert("Please register or login first");
	};

	return (
		<section className="dad__invest__container" id="invest">
			<div className="invest__container">
				{/* TITULO */}
				<div className="textosuperior">
					<div className="textosuperior__1">
						<h1 className="title__1">HOW IT</h1>
						<br />
						<h1 className="title__2">WORKS</h1>
					</div>
				</div>
				{/* STEPS */}
				<div className="steps">
					{/* STEP 1 */}
					<div className="grid__step">
						<div className="edicion">
							<h3 className="subtitle__step__title">
								STEP <span className="numero__claro">1</span>
							</h3>
						</div>
						<div className="edicion">
							<img
								src="./Assets/Iconos/Step_1.svg"
								className="logo__invest"
								alt=""
							/>
						</div>
						<div className="edicion">
							<h4 className="subtitulo__step">CREATE AN ACCOUNT</h4>
						</div>
						<div className="edicion">
							<p className="subtexto">
								Click the register button and complete the form on the page. We
								use 2 Factor Authentication to ensure your account is secure.
							</p>
						</div>
						<div className="edicion">
							<p className="punto"></p>
						</div>
					</div>
					{/* STEP 2 */}
					<div className="grid__step">
						<div className="edicion">
							<h3 className="subtitle__step__title">
								STEP <span className="numero__claro">2</span>
							</h3>
						</div>
						<div className="edicion">
							<img
								src="./Assets/Iconos/Step_2.svg"
								className="logo__invest"
								alt=""
							/>
						</div>
						<div className="edicion">
							<h4 className="subtitulo__step">ADD YOUR WALLET</h4>
						</div>
						<div className="edicion">
							<p className="subtexto">
								Enter your USDT deposit/receiving address so you can
								receive your payouts
								{/* Enter your USDT or USDC deposit/receiving address so you can
								receive your payouts */}
							</p>
						</div>
						<div className="edicion">
							<p className="punto"></p>
						</div>
					</div>
					{/* STEP 3 */}
					<div className="grid__step">
						<div className="edicion">
							<h3 className="subtitle__step__title">
								STEP <span className="numero__claro">3</span>
							</h3>
						</div>
						<div className="edicion">
							<img
								src="./Assets/Iconos/Step_3.svg"
								className="logo__invest"
								alt=""
							/>
						</div>
						<div className="edicion">
							<h4 className="subtitulo__step">PURCHASE A PACKAGE</h4>
						</div>
						<div className="edicion">
							<p className="subtexto">
								You may purchase 1 or more packages at a time and as often as
								you’d like. Daily/Weekly or Monthly.
							</p>
						</div>
						<div className="edicion">
							<p className="punto"></p>
						</div>
					</div>
					{/* STEP 4 */}
					<div className="grid__step">
						<div className="edicion">
							<h3 className="subtitle__step__title">
								STEP <span className="numero__claro">4</span>
							</h3>
						</div>
						<div className="edicion">
							<img
								src="./Assets/Iconos/Step_4.svg"
								className="logo__invest"
								alt=""
							/>
						</div>
						<div className="edicion">
							<h4 className="subtitulo__step">
								RECEIVE 25% USDT MONTHLY
								{/* RECEIVE 25% USDT OR USDC MONTHLY */}
							</h4>
						</div>
						<div className="edicion">
							<p className="subtexto">
								Sit back and relax as you will earn 25% on your package(s) every
								completed cycle.
							</p>
						</div>
						<div className="edicion">
							<p className="punto"></p>
						</div>
					</div>
				</div>
				{/* LINEA RECTA */}
				<div className="linea__recta">
					<div className="linea__invest"></div>
				</div>
				{/* BUTTOM */}
				<div className="button">
					<h3 className="button__text">CREATE YOUR ACCOUNT!</h3>
					<a href="/">
						<Bigbutton className="button__action" action={() => closeMenu()}>
							PURCHASE NOW!
						</Bigbutton>
					</a>
				</div>
			</div>
		</section>
	);
};

export default Invest;
