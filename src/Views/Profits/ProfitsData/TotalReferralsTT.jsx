import React, { useEffect, useState } from "react";
import TableToExcel from "@linways/table-to-excel";
import DataTableReferrals from "../../../Components/DataTableReferrals/DataTableReferrals";
import ExportExcel from "../../../Components/ExportExcel/ExportExcel";
import "./profitsdata.css";

const TotalReferralsTT = ({
	dataPackagesReferralsTierTwo,
	totalPackagesActiveTotalsTierTwo,
	referralsTierTwo,
	totalNumberOfActivePackagesTotalPurchasedTierTwo,
	totalNumberOfActivePackagesTotalReturnTierTwo,
}) => {
	const [dataTableReferrals, setDataTableReferrals] = useState();

	useEffect(() => {
		setDataTableReferrals(dataPackagesReferralsTierTwo);
	}, [dataPackagesReferralsTierTwo]);

	const generateExcel = () => {
		TableToExcel.convert(
			document.getElementById("dataTableReferrals_tier_two"),
			{
				name: "Information Total Referrals Tier Two.xlsx",
				sheet: {
					name: "Page 1",
				},
			}
		);
	};

	const generateExcelHidden = () => {
		TableToExcel.convert(
			document.getElementById("dataTableReferrals_tier_two_hidden"),
			{
				name: "Information All Tier Two Referrals.xlsx",
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
					Tier Two Active Packages : {totalPackagesActiveTotalsTierTwo}
				</p>
				<p className="packages_active_green">
					Total Purchased in Crypto:{" "}
					{totalNumberOfActivePackagesTotalPurchasedTierTwo}
				</p>
				<p className="packages_active_green">
					Your Total Commissions Payout:{" "}
					{totalNumberOfActivePackagesTotalReturnTierTwo}
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
				<p className="text_totals_blue_dark">TOTAL TIER TWO REFERRALS</p>
			</div>
			{/* EXPORT IN EXCEL */}
			<ExportExcel
				children={"Download Packages All Tier Two Referrals"}
				action={generateExcel}
			/>
			<ExportExcel
				children={"Download Info All Tier Two Referrals"}
				action={generateExcelHidden}
			/>
			{/* TABLE */}
			<div className="display_center_top position_dataTable_referrals">
				<DataTableReferrals
					isTotals={true}
					id="dataTableReferrals_tier_two"
					idtwo="dataTableReferrals_tier_two_hidden"
					dataTableReferrals={dataTableReferrals}
					referralsTierTwo={referralsTierTwo}
					tableHiddenTierOne={false}
				></DataTableReferrals>
			</div>
		</div>
	);
};

export default TotalReferralsTT;
