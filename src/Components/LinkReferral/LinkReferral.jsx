import React, { useState } from "react";
import Smallbutton from "../SmallButtons/Smallbutton";
import ModalShare from "../Modales/ModalShare/ModalShare";
import { referralLinkBaseUrl } from "../../Share/Constants";

import "./linkreferral.css";

const LinkReferral = () => {
	const referralCode =
		JSON.parse(sessionStorage.getItem("userData"))?.referralCode ?? "";
	const fullLinkReferral = referralLinkBaseUrl + referralCode;
	const [isOpenShare, setIsOpenShare] = useState(false);

	const closeShare = () => {
		setIsOpenShare(false);
	};

	const getLinkReferralCopied = () => {
		navigator.clipboard
			.writeText(fullLinkReferral)
			.then(() => {
				alert("Copied the text: " + fullLinkReferral);
			})
			.catch(() => {
				alert("Unable to copy. Please, manually select the link and copy");
			});
	};

	return (
		<>
			<div className="text_referrals_profits display">
				<div className="text_share_link_empity display_column">
					<p className="text_inviteReferrals_profits">
						Invite new users and get commissions.
					</p>
					<p className="text_inviteReferrals_profits-blue">
						Just copy the next link and send it to your friends or share it on
						your social networks
					</p>
					<div className="link_referral_container display_left">
						<p className="text_totals_black_link">{fullLinkReferral}</p>
					</div>
				</div>
			</div>
			<p className="disclaimer_referralProgram">
				<span> Note: </span> You absolutely cannot refer people living in the
				same household as you. NO STACKING permitted! You can use the link from
				the person who referred YOU to bring on your family members living in
				the same household. Your partner, companion, significant other,
				boyfriend, girlfriend also needs to use the link from the person who
				referred you if they live in the same household as you. If you’re
				married and one of the 2 of you live in different address you absolutely
				cannot refer them using your link. They must use the link from the
				person who referred you.
			</p>
			<div className="buttons_referrals display_rigth">
				<div className="buttons_referrals">
					<Smallbutton action={() => setIsOpenShare(true)}>
						Share Link
					</Smallbutton>
				</div>

				<div className="buttons_referrals">
					<Smallbutton action={getLinkReferralCopied}>Copy Link</Smallbutton>
				</div>
			</div>
			<ModalShare
				open={isOpenShare}
				close={closeShare}
				linkReferralShare={fullLinkReferral}
			/>
		</>
	);
};

export default LinkReferral;
