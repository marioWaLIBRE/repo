import React, { useEffect, useState } from "react";
import Bigbutton from "../../../Components/BigButtons/Bigbutton";
import { useNavigate } from "react-router-dom";
import "./profitsdata.css";

const ProfitsData = ({ profitsResponse }) => {
	const navigate = useNavigate();
	const [profitsResponseChild, setProfitsResponseChild] = useState();

	useEffect(() => {
		setProfitsResponseChild(profitsResponse);
	}, [profitsResponse]);

	return (
		<div className="text_referrals_profits_container_dad">
			<div className="text_referrals_profits">
				<div className="text_totals_blue text_total_size">
					<p className="text_totals_blue_dark">PACKAGES PROFITS</p>
				</div>
				<div className="text_invite_container display_left display_column">
					<p className="text_inviteReferrals_profits">
						Your package(s) payouts will be automatically deposited in your wallet selected to receive packages payouts.
					</p>
				</div>
			</div>
			<div className="totals_profits_user display">
				<div className="profits_user_totals_grid">
					<div className="border_responsive_profits_cero">
						<div className="text_totals_blue display_center_center_column">
							<p className="text_totals_blue_dark">
								{" "}
								TOTAL RECEIVED{" "}
							</p>
							<p className="text_totals_blue_light">
								{" "}
								PROFITS FROM MY PACKAGES{" "}
							</p>
						</div>
						<div className="totals_profits_circle text_totals_blue">
							<p>
								{" "}
								<span className="text_totals_blue_dark">
									{profitsResponseChild?.TotalPackagesProfits ?? 0}
								</span>{" "}
								<span className="text_totals_gray_dark"> USDT </span>{" "}
							</p>
						</div>
						<div className="text_totals_black display warpper">
							<p className="text_totals_black_light">
								{" "}
								Purchased Packages Total Value{" "}
							</p>
							<p className="text_totals_black_dark">
								{" "}
								{profitsResponseChild?.TotalInvestedPackagesProfits ??
									0}{" "}
							</p>
						</div>
					</div>
					<div className="border_responsive_profits_cero">
						<div className="text_totals_blue display display_column">
							<p className="text_totals_blue_dark"> THIS YEAR RECEIVED </p>
							<p className="text_totals_blue_light">
								{" "}
								PROFITS RECEIVED FROM MY PACKAGES{" "}
							</p>
						</div>
						<div className="totals_profits_circle text_totals_blue">
							<p>
								{" "}
								<span className="text_totals_blue_dark">
									{profitsResponseChild?.YearlyPackagesProfits ?? 0}
								</span>{" "}
								<span className="text_totals_gray_dark"> USDT </span>{" "}
							</p>
						</div>
						<div className="text_totals_black display warpper">
							<p className="text_totals_black_light">
								{" "}
								Purchased Packages Value This Year{" "}
							</p>
							<p className="text_totals_black_dark">
								{" "}
								{profitsResponseChild?.YearlyInvestedPackagesProfits ??
									0}{" "}
							</p>
						</div>
					</div>
					<div className="border_responsive_profits_cero">
						<div className="text_totals_blue display display_column">
							<p className="text_totals_blue_dark">
								{" "}
								THIS MONTH RECEIVED{" "}
							</p>
							<p className="text_totals_blue_light">
								{" "}
								PROFITS RECEIVED FROM MY PACKAGES{" "}
							</p>
						</div>
						<div className="totals_profits_circle text_totals_blue">
							<p>
								{" "}
								<span className="text_totals_blue_dark">
									{profitsResponseChild?.MonthlyPackagesProfits ?? 0}
								</span>{" "}
								<span className="text_totals_gray_dark"> USDT </span>{" "}
							</p>
						</div>
						<div className="text_totals_black display warpper">
							<p className="text_totals_black_light">
								{" "}
								Purchased Packages Value This Month{" "}
							</p>
							<p className="text_totals_black_dark">
								{" "}
								{profitsResponseChild?.MonthlyInvestedPackagesProfits ??
									0}{" "}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="buttons_referrals_container display_rigth">
				<div className="buttons_referrals">
					<p className="make_new_invest"> MAKE A NEW PURCHASE </p>
				</div>
				<div className="buttons_referrals">
					<Bigbutton action={() => navigate("/packages")}>
						PURCHASE NOW!
					</Bigbutton>
				</div>
			</div>
		</div>
	);
};

export default ProfitsData;
