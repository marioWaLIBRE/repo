import React, { useEffect, useState } from "react";
import TableToExcel from "@linways/table-to-excel";
import DataTableReferrals from "../../../Components/DataTableReferrals/DataTableReferrals";
import ExportExcel from "../../../Components/ExportExcel/ExportExcel";
import "./profitsdata.css";

const TotalReferrals = ({
	dataPackagesReferralsTierOne,
	totalPackagesActiveTotalsTierOne,
	referralsTierOne,
	totalNumberOfActivePackagesTotalPurchasedTierOne,
	totalNumberOfActivePackagesTotalReturnTierOne,
}) => {
	const [dataTableReferrals, setDataTableReferrals] = useState();

	useEffect(() => {
		setDataTableReferrals(dataPackagesReferralsTierOne);
	}, [dataPackagesReferralsTierOne]);

	const generateExcel = () => {
		TableToExcel.convert(
			document.getElementById("dataTableReferrals_tier_one"),
			{
				name: "Information Total Referrals Tier One.xlsx",
				sheet: {
					name: "Page 1",
				},
			}
		);
	};
	const generateExcelHidden = () => {
		TableToExcel.convert(
			document.getElementById("dataTableReferrals_tier_one_hidden"),
			{
				name: "Information All Tier One Referrals.xlsx",
				sheet: {
					name: "Page 1",
				},
			}
		);
	};

	return (
		<div className="text_referrals_profits_container_dad">
			<div className="text_active_container">
				<p className="packages_active_green">
					{" "}
					Tier One Active Packages: {totalPackagesActiveTotalsTierOne}
				</p>
				<p className="packages_active_green">
					Total Purchased in Crypto:{" "}
					{totalNumberOfActivePackagesTotalPurchasedTierOne}
				</p>
				<p className="packages_active_green">
					Your Total Commissions Payout:{" "}
					{totalNumberOfActivePackagesTotalReturnTierOne}
				</p>
			</div>
			<div className="disclaimer_text_packages_container display">
				<p className="disclaimer_text_packages_bold2">
					<b>
						<span className="disclaimer_text_packages">NOTE:</span> ALL Payout
						types, residual, referral commissions, cancelled payments will be
						paid out Before Midnight EST. Anytime during the day/night of the
						payout date.
					</b>
				</p>
			</div>
			<div className="text_totals_blue text_total_size">
				<p className="text_totals_blue_dark">TOTAL TIER ONE REFERRALS</p>
			</div>
			{/* EXPORT IN EXCEL */}
			<ExportExcel
				children={"Download Packages All Tier One Referrals"}
				action={generateExcel}
			/>
			<ExportExcel
				children={"Download Info All Tier One Referrals"}
				action={generateExcelHidden}
			/>
			{/* TABLE */}
			<div className="display_center_top position_dataTable_referrals">
				<DataTableReferrals
					isTotals={true}
					id="dataTableReferrals_tier_one"
					idtwo="dataTableReferrals_tier_one_hidden"
					dataTableReferrals={dataTableReferrals}
					referralsTierOne={referralsTierOne}
					tableHiddenTierOne={true}
				></DataTableReferrals>
			</div>
		</div>
	);
};

export default TotalReferrals;
