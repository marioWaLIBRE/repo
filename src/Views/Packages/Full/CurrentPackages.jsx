import React, { useEffect, useState } from "react";
import Bigbutton from "../../../Components/BigButtons/Bigbutton";
import DataTable from "../../../Components/DataTable/DataTable";
import FilterPackages from "../../../Components/FilterPackages/FilterPackages";
import moment from "moment";

import "./packagesFull.css";
import {
	getPaymentTransactions,
	getPckPurchaseTransaction,
} from "../../../Services/Packages.api";

const CurrentPackages = ({
	datosTabla,
	openQ,
	closeQ,
	funtOpen,
	setIsOpenBuy,
	setIsOpenSelectWallet,
	setSelectCurrency,
	selectCurrency,
	setTotalToPay,
	setTotalReceived,
	setIsOpenPayment,
	deleteAllPackagesRejected,
	totalNumberOfActivePackagesTotalPurchased,
	totalNumberOfActivePackages,
	totalNumberOfActivePackagesTotalReturn,
	...props
}) => {
	/**
	 *
	 * Funcion para traerme los p[aquetes del componente padre Packages]
	 */
	const getPackage = props.getPackage;

	const [datosTablaFiltered, setDatosTablaFiltered] = useState(datosTabla);

	const [filterState, setFilterState] = useState("A");
	const [filterInitialDate, setFilterInitialDate] = useState(null);
	const [filterFinalDate, setFilterFinalDate] = useState(null);
	const [infoPckPurchaseTransaction, setInfoPckPurchaseTransaction] = useState(
		[]
	);
	const [infoPaymentTransactions, setInfoPaymentTransactions] = useState([]);

	const clearFilters = () => {
		setFilterInitialDate(null);
		setFilterFinalDate(null);
	};

	useEffect(() => {
		filterPackagesByStateAndDateRange(
			datosTabla,
			filterState,
			filterInitialDate,
			filterFinalDate
		);
		//Escucha tambien datosTabla porque cuando se crea un nuevo paquete currenPackages tambien debe recibir los cambios efectuados en Packages y filtrarlos para poderlos pasar a dataTable.
	}, [filterState, filterInitialDate, filterFinalDate, datosTabla]);

	const getInfoPckPurchaseTransaction = (PackagesId) => {
		setInfoPckPurchaseTransaction([]);
		setInfoPaymentTransactions([]);
		getPckPurchaseTransaction(PackagesId)
			.then((res) => {
				if (res.status === 200) {
					setInfoPckPurchaseTransaction(res.data);
				}
			})
			.catch((e) => {
				console.log("Error: ", e.res?.data);
				if (e.res?.data.message) {
					alert(e.res?.data.message);
				}
			});
	};
	const getInfoPaymentTransactions = (PackagesId, email) => {
		setInfoPckPurchaseTransaction([]);
		setInfoPaymentTransactions([]);
		getPaymentTransactions(PackagesId, email)
			.then((res) => {
				if (res.status === 200) {
					setInfoPaymentTransactions(res.data);
				}
			})
			.catch((e) => {
				console.log("Error: ", e.res?.data);
				if (e.res?.data.message) {
					alert(e.res?.data.message);
				}
			});
	};

	const filterPackagesByStateAndDateRange = (
		contenidoTable,
		filterState,
		filterInitialDate,
		filterFinalDate
	) => {
		let tempDatosTabla = [];
		contenidoTable.forEach((contenidoTableItem) => {
			let packageCompliesWithFilters = true;
			if (filterState && filterState !== "0") {
				if (filterState === "A") {
					// A es Activos y abarca los estados 1, 2 y 3
					if (
						!(
							contenidoTableItem.PackagesState.toString() === "1" ||
							contenidoTableItem.PackagesState.toString() === "2" ||
							contenidoTableItem.PackagesState.toString() === "3"
						)
					) {
						packageCompliesWithFilters = false;
					}
				} else if (
					contenidoTableItem.PackagesState.toString() !== filterState.toString()
				) {
					packageCompliesWithFilters = false;
				}
			}
			if (filterInitialDate) {
				if (
					!(
						Date.parse(contenidoTableItem.PackagesDateReceived) >=
						Date.parse(moment(filterInitialDate).format("YYYY-MM-DD"))
					)
				) {
					packageCompliesWithFilters = false;
				}
			}
			if (filterFinalDate) {
				if (
					!(
						Date.parse(contenidoTableItem.PackagesDateReceived) <=
						Date.parse(moment(filterFinalDate).format("YYYY-MM-DD"))
					)
				) {
					packageCompliesWithFilters = false;
				}
			}
			if (packageCompliesWithFilters) {
				tempDatosTabla.push(contenidoTableItem);
			}
		});
		setDatosTablaFiltered(tempDatosTabla);
	};

	return (
		<section className="container_principal_current">
			<div className="filter_container_state_currentpackages">
				<ul className="filter_container_state_currentpackages_ul">
					<li className="filter_container_state_currentpackages_li">
						<button
							className={
								filterState === "A"
									? "filter_container_state_currentpackages_buttonAct filter_container_state_currentpackages_buttonAct_active"
									: "filter_container_state_currentpackages_buttonAct"
							}
							onClick={() => setFilterState("A")}
						>
							Pending or Active
						</button>
					</li>
					<li className="filter_container_state_currentpackages_li">
						<button
							className={
								filterState === "4"
									? "filter_container_state_currentpackages_buttonCan filter_container_state_currentpackages_buttonCan_active"
									: "filter_container_state_currentpackages_buttonCan"
							}
							onClick={() => setFilterState("4")}
						>
							Cancelled
						</button>
					</li>
					<li className="filter_container_state_currentpackages_li">
						<button
							className={
								filterState === "5"
									? "filter_container_state_currentpackages_buttonRej filter_container_state_currentpackages_buttonRej_active"
									: "filter_container_state_currentpackages_buttonRej"
							}
							onClick={() => setFilterState("5")}
						>
							Rejected
						</button>
					</li>
				</ul>
			</div>
			<div className="filter_container_currentpackages">
				<FilterPackages
					filterState={filterState}
					filterInitialDate={filterInitialDate}
					filterFinalDate={filterFinalDate}
					setFilterState={setFilterState}
					setFilterInitialDate={setFilterInitialDate}
					setFilterFinalDate={setFilterFinalDate}
					clearFilters={clearFilters}
					deleteAllPackagesRejected={deleteAllPackagesRejected}
				/>
			</div>
			<div className="table_container_currentpackages">
				<DataTable
					contenidoTable={datosTablaFiltered}
					setSelectCurrencyFromPackages={setSelectCurrency}
					getPackage={getPackage}
					selectCurrency={selectCurrency}
					setTotalToPay={setTotalToPay}
					setTotalReceived={setTotalReceived}
					setIsOpenPayment={setIsOpenPayment}
					infoPckPurchaseTransaction={infoPckPurchaseTransaction}
					infoPaymentTransactions={infoPaymentTransactions}
					getInfoPckPurchaseTransaction={getInfoPckPurchaseTransaction}
					getInfoPaymentTransactions={getInfoPaymentTransactions}
				/>
			</div>
			<div className="text_active_container">
				<p className="packages_active_green">
					Active Packages: {totalNumberOfActivePackages}
				</p>
				<p className="packages_active_green">
					Total Purchased in Crypto: {totalNumberOfActivePackagesTotalPurchased}
				</p>
				<p className="packages_active_green">
					Total Payout: {totalNumberOfActivePackagesTotalReturn}
				</p>
			</div>
			<div className="disclaimer_text_packages_container display">
				<p className="disclaimer_text_packages">
					{" "}
					Crypto packages can be risky, purchase packages responsibly.{" "}
				</p>
			</div>
			<div className="disclaimer_text_packages_container display">
				<p className="disclaimer_text_packages_bold">
					<b>
						<span className="disclaimer_text_packages">NOTE:</span> ALL Payout
						types, residual, referral commissions, cancelled payments will be
						paid out Before Midnight EST. Anytime during the day/night of the
						payout date.
					</b>
				</p>
			</div>
			<div className="disclaimer_text_packages_container display">
				<p>
					<span className="disclaimer_text_packages">Note:</span> CryptoProgram
					does not charge any fees when purchasing your package(s). However, you
					may be charged fees from your exchange, from your wallet and going
					through the Ethereum Network. So the amount that shows up to purchase
					your package may be less than the amount owed for your package,
					therefore, you may have to add additional funds to complete your
					package purchase and the total amount is properly delivered to the
					Program. Any amount that's sent over the amount owed of your
					package(s) does not get credited, it goes to the Program to help
					support the costs of running the program and the expenses associated
					with it.{" "}
				</p>
			</div>
			<div className="disclaimer_text_packages_container display">
				<p>
					<span className="disclaimer_text_packages"> Warning: </span>
					You must register in your profile a wallet you will use to send funds
					with from a Decentralized Crypto Wallet (Like Exodus, Trust Wallet,
					MetaMask, Ledger, Ngrave, Atomic Wallet, Klever, Coolbit - Cold
					Wallet, Brave wallet), and you must select that exact wallet while
					purchasing package(s) in the “Wallet you will use to purchase”
					Dropdown. If you don’t send funds from the same wallet you selected,
					there will be a delay with the automation to activate your package and
					can take several days.
				</p>
			</div>
			<div>
				<p className="text_note_wallet">
					<span className="wallets_alert_red">Warning: </span>If you fail to
					send funds from a decentralized wallet and send from a centralized
					wallet to purchase your package it will not be activated, support will
					assign you a unique fee between 70 and 75 USDT you will have to send,
					and your funds will be returned to you within 7 days.
					{/* USDT/USDC admin fee to send them back to you. */}
				</p>
			</div>
			<br />
			<div className="BigButton_investNow_currentPackages">
				<Bigbutton action={() => setIsOpenSelectWallet(true)}>
					Purchase Now
				</Bigbutton>
			</div>
		</section>
	);
};

export default CurrentPackages;
