import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableToExcel from "@linways/table-to-excel";
import DataTableReferrals from "../../../Components/DataTableReferrals/DataTableReferrals";
import Selects from "../../../Components/Select/Select";
import Smallbutton from "../../../Components/SmallButtons/Smallbutton";
import ExportExcel from "../../../Components/ExportExcel/ExportExcel";
import LinkReferral from "../../../Components/LinkReferral/LinkReferral";

const SecondLevel = ({
	getPackagesApi,
	referralsTierTwo,
	dataPackagesReferrals,
	walletProfitsReferral,
}) => {
	const [selectReferral, setSelectReferral] = useState();
	const [dataTableReferrals, setDataTableReferrals] = useState();
	const [walletProfitsReferralChild, setWalletProfitsReferralChild] =
		useState();

	const navigate = useNavigate();

	useEffect(() => {
		if (referralsTierTwo.length > 0) {
			setSelectReferral(referralsTierTwo[0]);
			//Traer los paquetes del primer referido por defecto
			getPackagesApi(referralsTierTwo[0].value);
		}
	}, [referralsTierTwo]);

	useEffect(() => {
		setDataTableReferrals(dataPackagesReferrals);
	}, [dataPackagesReferrals]);

	useEffect(() => {
		setWalletProfitsReferralChild(walletProfitsReferral);
	}, [walletProfitsReferral]);

	/**
	 *
	 *Función para generar convertir la tabla a excel y generarlo
	 */
	const generateExcel = () => {
		TableToExcel.convert(document.getElementById("dataTableReferrals_id"), {
			name: "Information Referrals Tier Two.xlsx",
			sheet: {
				name: "Page 1",
			},
		});
	};
	const handleChange = (selectedOption) => {
		setSelectReferral(selectedOption);
		// Traerme los paquetes del referido seleccionado
		getPackagesApi(selectedOption.value);
	};

	return (
		<section>
			<div className="alert_profits_container display_right_center">
				<p className="alert_profits">
					You must purchase at least 1 package in order to earn referral
					commissions.
					<br />
					<br />
					Also, if you cancel your 1 package and have referrals you won’t earn
					referral commission since you don’t have at least 1 active package.
				</p>
			</div>
			{/* EXPORT IN EXCEL */}
			<ExportExcel
				children={"Download Packages Tier Two Referral"}
				action={generateExcel}
			/>
			{/* SUBGRID FOR TABLE AND FILTER */}
			<div className="container_selectTable_first_level display_spaceEvenly_center_flex">
				{/* FILTER */}
				<div className="title_first_referrals">
					<div className="display_right_column">
						<h1 className="text_down_rightTi_payProfits">REFERRED USERS</h1>
						<h2 className="text_down_rightTi_payProfits">Tier two</h2>
					</div>
					<div className="display_end_top">
						<Selects
							className={"select_first_referrals"}
							options={referralsTierTwo}
							onChange={handleChange}
							// defaultValue={selectReferral[0]}
							value={selectReferral}
						></Selects>
					</div>
				</div>
				{/* TABLE */}
				<div className="display_center_top position_dataTable_referrals">
					<DataTableReferrals
						isTotals={false}
						dataTableReferrals={dataTableReferrals}
					></DataTableReferrals>
				</div>
			</div>
			{/* TEXT */}
			<div className="display_right_column">
				<p className="text_down_rightTi_payProfits">
					Pay referral profits to my wallet
				</p>
				<p className="text_down_rightTe_payProfits">
					Your referral profits will be automatically deposited in your wallet.
				</p>
			</div>
			{/* BUTTON AND CONSUMER */}
			<div className="container_currency_proFirtLvL display_right_center">
				<div className="text_down_rightTe_payProfits measures_content_down_profits display_center_center">
					<img
						className="logo__currency__profits"
						src={walletProfitsReferralChild?.CurrenciesIconUrl ?? ""}
						alt=""
					/>
				</div>
				<div className="text_down_rightTe_payProfits measures_content_down_profits display_center_center">
					{walletProfitsReferralChild?.UsersCliWalletsName ?? ""}
				</div>
			</div>
			<div className="container_change_wallet_proFirtLvL">
				<Smallbutton action={() => navigate("/profile")}>
					Change Wallet
				</Smallbutton>
			</div>
			{/* SECTION FOR SHARE LINK */}
			<div className="display_center_certer_column">
				<LinkReferral/>
			</div>
		</section>
	);
};

export default SecondLevel;
