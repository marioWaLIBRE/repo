import React, { useEffect, useState } from "react";

import Bigbutton from "../../../Components/BigButtons/Bigbutton";
import "./packagesEmpty.css";
import ModalFirstWallet from "../../../Components/Modales/ModalFirstWallet/ModalFirstWallet";
import { getWallets } from "../../../Services/Wallets.api";

const CurrentPackagesEmpty = ({ setIsOpenSelectWallet }) => {
	/**
	 *
	 * UseStates para a apertura y cierre de los modales
	 */
	const [openAlertBuyWallet, setOpenAlertBuyWallet] = useState(false);

	/**
	 *
	 * UseState para asignar el crear el array de objetos con las wallets
	 */
	const [dataWallets, setDataWallets] = useState([]);

	useEffect(() => {
		getWalletsUser();
	}, []);

	/**
	 *
	 * consumo de web services para obtener las wallets del usuario.
	 */
	const getWalletsUser = () => {
		getWallets()
			.then((res) => {
				if (res.data.length > 0) {
					setDataWallets(res.data);
				} else {
					setDataWallets([]);
				}
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	/**
	 *
	 * funcion condicional para obtener modal de alerta o modal de buypackages
	 */
	const condicionaAlertBuyPackages = () => {
		if (dataWallets.length > 0) {
			setIsOpenSelectWallet(true);
		} else {
			setOpenAlertBuyWallet(true);
		}
	};

	/**
	 *
	 * Función para traer los paquetes cuando se cierre el modal
	 */

	return (
		<>
			<div className="text_panel_title">
				<p>
					<span className="package_light-blue">YOU DON’T HAVE</span>
					<span className="package_dark-blue"> ANY PACKAGES </span>
				</p>
			</div>
			<div className="package_empty-container display">
				<div className="package_empty-grid">
					<div>
						<p>
							<span className="dark_text-pakage-empty">
								Purchase your first package, this is all you need to know.
							</span>
							<br /> <br /> <br />
							<span className="light_text-pakage-empty">
								1. Choose the currency you wanna use to buy your packages.{" "}
								<br /> <br /> <br /> 2. Verify that you have at least 1 wallet
								registered in your profile to receive profit from the purchased
								packages. <br />
								<br /> <br /> 3. The payment of your profits is automatic, when
								you first buy a package, the first profits payment will be 32
								days after we receive your cryptos at the purchase time, after
								this point the platform will make the profits payment every 30
								days in your registered wallet.
							</span>
						</p>
					</div>
					<div className="package_empty-img display">
						<img src="./Assets/Images/Packages_No.svg" alt="" />
					</div>
				</div>
			</div>
			<br />
			<center>
				<div className="horizontal_divider-packages"></div>
				<p className="p_packages-message">
					ALL EARNINGS ARE PAID IN CRYPTOCURRENCIES.
				</p>
				<p className="text_note_wallet">
					<span className="wallets_alert_red">Warning: </span>If you fail to
					send funds from a decentralized wallet and send from a centralized
					wallet to purchase your package it will not be activated, and your
					funds will be returned to you within 7 days and there will be a 75
					USDT admin fee to send them back to you.
					{/* USDT/USDC admin fee to send them back to you. */}
				</p>
				<br />
				<Bigbutton
					className="btn_packages-invest"
					action={condicionaAlertBuyPackages}
				>
					Purchase now
				</Bigbutton>
			</center>
			<ModalFirstWallet
				titulo1={""}
				titulo2={"REGISTER FIRST WALLET"}
				open={openAlertBuyWallet}
				close={() => setOpenAlertBuyWallet(false)}
				backbutton={false}
			/>
		</>
	);
};

export default CurrentPackagesEmpty;
