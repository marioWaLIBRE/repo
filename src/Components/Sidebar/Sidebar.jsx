import React from "react";
import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { menuLists } from "../../Share/Constants";

const CustomLink = ({ href, name, img, ...props }) => {
	const path = window.location.pathname;
	return (
		<NavLink to={href} {...props} className="links">
			<div className={path.indexOf(href) !== -1 ? "menu position" : "menu"}>
				<img src={img} alt="" className="logo__items" />
				<p className="textos">{name}</p>
			</div>
		</NavLink>
	);
};

const Sidebar = () => {
	const navigate = useNavigate();

	const usersCliWallets = JSON.parse(sessionStorage.getItem("userData"))?.usersCliWallets ?? 0
	const UsersCliActivePackages = JSON.parse(sessionStorage.getItem("userData"))?.UsersCliActivePackages ?? 0

	const Logout = () => {
		sessionStorage.clear();
		navigate("/");
	};

	return (
		// CONTAINER SIDEBAR
		<section className="colorbackgroud__sidebar">
			<nav className="dad__sidebar__container">
				<div className="sidebar__container">
					{/* LOGO */}
					<div className="formato__container ">
						<div>
							<img
								src="./Assets/Logo Colores/Asset 34.svg"
								alt=""
								className="logo__sidebar"
							/>
						</div>
					</div>
					{/* MENU */}
					<div className="links_navbar--inside">
						{menuLists
							.filter((itemFilter) => {
								if (usersCliWallets === "0") {
									return itemFilter.name === "Profile";
								} else if (
									usersCliWallets > "0" &&
									UsersCliActivePackages === "0"
								) {
									return (
										itemFilter.name === "Profile" ||
										itemFilter.name === "Packages"
									);
								} else {
									return true;
								}
							})
							.map((itemMap) => {
								return (
									<CustomLink
										href={itemMap.href}
										img={itemMap.img}
										name={itemMap.name}
										key={itemMap.name}
									></CustomLink>
								);
							})}
					</div>
					{/* LOGOUT */}
					<div className="logout">
						<button onClick={Logout} className="links">
							<div className="menu position__logout">
								<img
									src="Assets\IconosColor\LogoutRed.svg"
									alt=""
									className="logo__items"
								/>
								<p className="textos">Logout</p>
								
							</div>
							<br />
							<div className="text_logout_container">
								<p className="text_logout">Secure logout with logout button</p>
							</div>
							
						</button>
					</div>
				</div>
			</nav>
		</section>
	);
};

export default Sidebar;
