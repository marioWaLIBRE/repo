import React from "react";
import Modal from "../Modal/Modal";
import "./modalterms.css";

const ModalTerms = ({
	open,
	close,
	titulo1,
	titulo2,
	backbutton,
}) => {
	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="scroll_container_modalterms">
				<div className="titulo__terms">
					<h1 className="texto__titulo__terms">
						PLEASE READ THE FOLLOWING TERMS & RULES CAREFULLY BEFORE
						CREATING AN ACCOUNT.
					</h1>
				</div>
				<div className="subcontainer__terms">
					<div className="terms">
						<p className="texto__terms">
							You agree to be of legal age in your country to partake
							in this program, and in all the cases your minimal age
							must be 18 years.
							<br />
							<br />
							The use of this site is restricted to our members and to
							individuals personally invited by them. Every package
							purchased is considered to be a private transaction
							between the platform and the Member.
							<br />
							<br />
							As a private transaction, this program is exempt from
							the US Securities Act of 1933, the US Securities
							Exchange Act of 1934 and the US Investment Company Act
							of 1940 and all other rules, regulations and amendments
							thereof. The platform not FDIC insured. The platform is
							not a licensed bank or a security firm. Clients from the
							US are discouraged to participate.
							<br />
							<br />
							You agree that all information, communications,
							materials coming from the platform are unsolicited and
							must be kept private, confidential and protected from
							any disclosure. Moreover, the information,
							communications and materials contained herein are not to
							be regarded as an offer, nor a solicitation for
							investments in any jurisdiction which deems non-public
							offers or solicitations unlawful, nor to any person to
							whom it will be unlawful to make such offer or
							solicitation.
							<br />
							<br />
							All the data giving by a member to the platform will be
							only privately used and not disclosed to any third
							parties. The platform is not responsible or liable for
							any loss of data.
							<br />
							<br />
							You agree to hold all principals and members harmless of
							any liability. You are purchasing packages at your own
							risk and you agree that a past performance is not an
							explicit guarantee for the same future performance. You
							agree that all information, communications and materials
							you will find on this site are intended to be regarded
							as an informational and educational matter and not an
							investment advice.
							<br />
							<br />
							The platform reserves the right to change the rules,
							commissions and rates of the crypto program at any time
							and at our sole discretion without notice, especially in
							order to respect the integrity and security of the
							members' interests. You agree that it is your sole
							responsibility to review the current terms.
							<br />
							<br />
							The platform is not responsible or liable for any
							damages, losses and costs resulting from any violation
							of the conditions and terms and/or use of our website by
							a member. You guarantee to the platform that you will
							not use this site in any illegal way and you agree to
							respect your local, national and international laws.
							<br />
							<br />
							If you do not agree with the above disclaimer, please do
							not go any further and do not create an account.
							<br />
						</p>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ModalTerms;
