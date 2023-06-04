import React, { useState } from "react";
import LinkReferral from "../../../Components/LinkReferral/LinkReferral";

import "./referralsempty.css";

const SecondlevelEmpty = () => {

	return (
		<>
			<div className="text_profits_container">
				<p className="text_profits">
					{" "}
					Your referrals’ profits will be automatically deposited in
					your wallet.{" "}
				</p>
			</div>
			<center>
				<div className="profit_empty-img display">
					<img
						className="size_image_referrals_empity"
						src="./Assets/Images/Referral_Second_No.svg"
						alt=""
					/>
				</div>
				<div className="horizontal_divider-profits"></div>
				<br />
			</center>
			<LinkReferral/>
		</>
	);
};

export default SecondlevelEmpty;
