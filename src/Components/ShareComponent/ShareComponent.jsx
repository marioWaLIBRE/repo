import React from "react";
import "./sharecomponent.css";
import {
	EmailShareButton,
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";
import {
	EmailIcon,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";
/* 
// Creación del componente ShareComponent que permite compartir el enlace de referidos en las redes sociales
*/

const ShareComponent = ({ ...props }) => {
	// Links para compartir tu enlace de referidos en tus redes sociales
	const linkReferralShare = props.linkReferralShare;

	const title =
		"I invite you to CryptoProgram the best place to invest and win";

	return (
		<div className="share_component_container">
			<div className="share_component">
				<FacebookShareButton
					url={linkReferralShare}
					quote={title}
					className="share_component_share-button"
				>
					<FacebookIcon size={50} round />
				</FacebookShareButton>
				<div className="text_img_share_container">
					<span className="text_img_share"> Facebook</span>
				</div>
			</div>

			<div className="share_component">
				<TwitterShareButton
					url={linkReferralShare}
					title={title}
					className="share_component_share-button"
				>
					<TwitterIcon size={50} round />
				</TwitterShareButton>
				<div className="text_img_share_container">
					<span className="text_img_share"> Twitter</span>
				</div>
			</div>

			<div className="share_component">
				<WhatsappShareButton
					url={linkReferralShare}
					title={title}
					separator=":"
					className="share_component_share-button"
				>
					<WhatsappIcon size={50} round />
				</WhatsappShareButton>
				<div className="text_img_share_container">
					<span className="text_img_share"> WhatsApp </span>
				</div>
			</div>

			<div className="share_component">
				<EmailShareButton
					url={linkReferralShare}
					subject={title}
					body="body"
					className="share_component_share-button"
				>
					<EmailIcon size={50} round />
				</EmailShareButton>
				<div className="text_img_share_container">
					<span className="text_img_share"> Email </span>
				</div>
			</div>
		</div>
	);
};

export default ShareComponent;
