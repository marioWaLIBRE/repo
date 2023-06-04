import React, { useState } from "react";
import Subheader from "../../Subheader/Subheader";
import ListNavbar from "./ListNavbar";

import "./navbar.css";

const Navbar = ({ setActiveAboutSlide }) => {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);

	return (
		<section className="navbar_container">
			<nav className="navbar">
				<div className="navbar_subheader">
					<Subheader />
				</div>
				<div className="hamburger" onClick={handleClick}>
					{click ? (
						<img
							className="icons_menu_burger"
							src="./Assets/Iconos/closeHamburger.svg"
							alt=""
						/>
					) : (
						<img
							className="icons_menu_burger"
							src="./Assets/Iconos/hamburger.svg"
							alt=""
						/>
					)}
				</div>
				<div className={click ? "nav-menu active" : "nav-menu"}>
					<ListNavbar
						setActiveAboutSlide={setActiveAboutSlide}
						setClick={setClick}
					/>
				</div>
			</nav>
		</section>
	);
};

export default Navbar;
