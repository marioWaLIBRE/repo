import React, { useEffect, useState } from "react";
import LinkReferral from "../../../Components/LinkReferral/LinkReferral";
import "./profitsdata.css";

const ProfitsDataReferrals = ({
	profitsResponse,
	referralsTierOneNumber,
	referralsTierTwoNumber,
}) => {
	const [profitsResponseChild, setProfitsResponseChild] = useState();
	const [
		referralsTierOneNumberChild,
		setReferralsTierOneNumberChild,
	] = useState(0);
	const [
		referralsTierTwoNumberChild,
		setReferralsTierTwoNumberChild,
	] = useState(0);

	useEffect(() => {
		setProfitsResponseChild(profitsResponse);
	}, [profitsResponse]);

	useEffect(() => {
		setReferralsTierOneNumberChild(referralsTierOneNumber);
		setReferralsTierTwoNumberChild(referralsTierTwoNumber);
	}, [referralsTierOneNumber, referralsTierTwoNumber]);

	return (
		<div className="text_referrals_profits_container_dad">
			<div className="text_referrals_profits">
				<div className="text_totals_blue text_total_size">
					<p className="text_totals_blue_dark">REFERRAL COMMISSIONS PROFITS</p>
				</div>
				<div className="text_invite_container display_left display_column">
					<p className="text_inviteReferrals_profits">
						Your referral commissions payouts will be automatically deposited in your wallet selected to receive referral commission payouts.
					</p>
					<p className="text_inviteReferrals_profits-blue">
						Tier one referrals are those who have been referred using your referral link and tier two referrals are those who have been referred by your tier one referrals.
					</p>
				</div>
			</div>
			<div className="totals_profits_user display">
				<div className="profits_referrals_user_totals_grid">
					<div className="border_responsive_profits_cero">
						<div className="text_totals_blue display warpper">
							<p className="text_totals_blue_dark">
								{" "}
								THIS MONTH RECEIVED{" "}
							</p>
							<p className="text_totals_blue_light">
								{" "}
								TIER ONE REFERRAL COMMISSIONS{" "}
							</p>
						</div>
						<div className="totals_profits_circle text_totals_blue">
							<p>
								{" "}
								<span className="text_totals_blue_dark">
									{profitsResponseChild?.MonthlyTierOneReferralsProfits ??
										0}
								</span>{" "}
								<span className="text_totals_gray_dark"> USDT </span>{" "}
							</p>
						</div>
					</div>
					<div className="border_responsive_profits_cero">
						<div className="text_totals_blue display warpper">
							<p className="text_totals_blue_dark">
								{" "}
								THIS MONTH RECEIVED{" "}
							</p>
							<p className="text_totals_blue_light">
								{" "}
								TIER TWO REFERRAL COMMISSIONS{" "}
							</p>
						</div>
						<div className="totals_profits_circle text_totals_blue">
							<p>
								{" "}
								<span className="text_totals_blue_dark">
									{profitsResponseChild?.MonthlyTierTwoReferralsProfits ??
										0}
								</span>{" "}
								<span className="text_totals_gray_dark"> USDT </span>{" "}
							</p>
						</div>
						<div className="text_totals_black display warpper"></div>
					</div>
					<div className="border_responsive_profits_cero">
						<div className="text_totals_blue display warpper">
							<p className="text_totals_blue_dark">
								{" "}
								TOTAL RECEIVED{" "}
							</p>
							<p className="text_totals_blue_light">
								{" "}
								TIER ONE REFERRAL COMMISSIONS{" "}
							</p>
						</div>
						<div className="totals_profits_circle text_totals_blue">
							<p>
								{" "}
								<span className="text_totals_blue_dark">
									{profitsResponseChild?.TotalTierOneReferralsProfits ??
										0}
								</span>{" "}
								<span className="text_totals_gray_dark"> USDT </span>{" "}
							</p>
						</div>
						<div className="text_totals_black display warpper">
							<p className="text_totals_black_light">
								{" "}
								Total Tier One Referrals{" "}
							</p>
							<p className="text_totals_black_dark">
								{" "}
								{referralsTierOneNumberChild ?? 0}{" "}
							</p>
						</div>
					</div>
					<div className="border_responsive_profits_cero">
						<div className="text_totals_blue display warpper">
							<p className="text_totals_blue_dark">
								{" "}
								TOTAL RECEIVED{" "}
							</p>
							<p className="text_totals_blue_light">
								{" "}
								TIER TWO REFERRAL COMMISSIONS{" "}
							</p>
						</div>
						<div className="totals_profits_circle text_totals_blue">
							<p>
								{" "}
								<span className="text_totals_blue_dark">
									{profitsResponseChild?.TotalTierTwoReferralsProfits ??
										0}
								</span>{" "}
								<span className="text_totals_gray_dark"> USDT </span>{" "}
							</p>
						</div>
						<div className="text_totals_black display warpper">
							<p className="text_totals_black_light">
								{" "}
								Total Tier Two Referrals{" "}
							</p>
							<p className="text_totals_black_dark">
								{" "}
								{referralsTierTwoNumberChild ?? 0}{" "}
							</p>
						</div>
					</div>
					<div className="central_container_total_referrals_profits">
						<div className="border_responsive_profits_cero">
							<div className="text_totals_blue display warpper">
								<p className="text_totals_blue_dark">
									{" "}
									TOTAL RECEIVED{" "}
								</p>
								<p className="text_totals_blue_light">
									{" "}
									TIER ONE AND TIER TWO REFERRAL COMMISSIONS{" "}
								</p>
							</div>
							<div className="totals_profits_circle text_totals_blue">
								<p>
									{" "}
									<span className="text_totals_blue_dark">
										{" "}
										{(profitsResponseChild?.TotalTierOneReferralsProfits ??
											0) +
											(profitsResponseChild?.TotalTierTwoReferralsProfits ??
												0)}
									</span>{" "}
									<span className="text_totals_gray_dark">
										{" "}
										USDT{" "}
									</span>{" "}
								</p>
							</div>
							<div className="text_totals_black display warpper">
								<p className="text_totals_black_light">
									{" "}
									Total referrals{" "}
								</p>
								<p className="text_totals_black_dark">
									{" "}
									{(referralsTierOneNumberChild ?? 0) +
										(referralsTierTwoNumberChild ?? 0)}{" "}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="text_referrals_profits">
				<LinkReferral/>
			</div>
		</div>
	);
};

export default ProfitsDataReferrals;
