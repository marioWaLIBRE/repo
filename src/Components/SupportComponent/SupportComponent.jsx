import React, { useEffect, useState } from "react";
import { getReferrers } from "../../Services/SupportContact.api";
import "./supportComponent.css";

const SupportComponent = ({ className, classNameLink }) => {
	const path = window.location.pathname;

	const [getReferrersValueTierOneEmail, setGetReferrersValueTierOneEmail] =
		useState();
	const [getReferrersValueTierOneName, setGetReferrersValueTierOneName] =
		useState();
	const [getReferrersValueTierTwoEmail, setGetReferrersValueTierTwoEmail] =
		useState();
	const [getReferrersValueTierTwoName, setGetReferrersValueTierTwoName] =
		useState();

	useEffect(() => {
		getReferrersForSupport();
	}, []);

	const getReferrersForSupport = () => {
		getReferrers().then((response) => {
			if (response.status === 200) {
				setGetReferrersValueTierOneEmail(response.data.ReferrerTierOneEmail);
				setGetReferrersValueTierOneName(response.data.ReferrerTierOneFullName);
				setGetReferrersValueTierTwoEmail(response.data.ReferrerTierTwoEmail);
				setGetReferrersValueTierTwoName(response.data.ReferrerTierTwoFullName);
			}
		});
	};

	return (
		<div className={classNameLink ?? "support_cryptoprogram_container"}>
			{path === "/frequentQuestions-public" ? (
				<div></div>
			) : (
				<p className={className ?? "support_cryptoprogram"}>
					{getReferrersValueTierOneEmail
						? `For additional help contact the person that referred you,
					${getReferrersValueTierOneName}, ${getReferrersValueTierOneEmail}`
						: ""}
					<br />
					{getReferrersValueTierTwoEmail
						? `or the person that referred them
					${getReferrersValueTierTwoName},
					${getReferrersValueTierTwoEmail}`
						: ""}
				</p>
			)}
		</div>
	);
};

export default SupportComponent;
