import React from "react";
import ShareComponent from "../../ShareComponent/ShareComponent";
import "./modalshare.css";

const ModalShare = ({ open, close, ...props }) => {
	const closeShare = () => {
		close();
	};
	const linkReferralShare = props.linkReferralShare;

	const getLinkReferralCopied = () => {
		navigator.clipboard
			.writeText(linkReferralShare)
			.then(() => {
				alert("Copied the text: " + linkReferralShare);
			})
			.catch(() => {
				alert(
					"Unable to copy. Please, manually select the link and copy"
				);
			});
	};
	return (
		<div
			className={`dad__container__modal_share ${
				open && "open_modal_share"
			}`}
		>
			<div className="container__modal_share display_center_center_column">
				<div className="title_modal_share_container ">
					<div className="display_center_center">
						<div className="title_modal_share"> Share </div>
					</div>
					<div className="display_center_center">
						<button
							className="button_close_share"
							onClick={closeShare}
						>
							<img
								className="icon_share_close"
								src="./Assets/Iconos/close.png"
								alt=""
							/>
						</button>
					</div>
				</div>
				<ShareComponent linkReferralShare={linkReferralShare} />
				<div className="display_center_center">
					<div className="input_code_share_container">
						<div className="code_referral"> {linkReferralShare} </div>
					</div>
				</div>
				<div>
					<button
						className="span_code_share"
						onClick={getLinkReferralCopied}
					>
						COPY
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalShare;
