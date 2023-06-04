import React, { useState } from "react";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate, useSearchParams } from "react-router-dom";
import Buttonback from "../ButtonBack/Buttonback";
import Subheader from "../Subheader/Subheader";
import { getProfileApi } from "../../Services/Profile.api";
import "./codeqr.css";
import {
	qrValidate,
	qrVerify,
	sendCodeEmail,
	validateEmailApi,
} from "../../Services/Loogin.api";
import ExpandableList from "../ExpandibleList/ExpandableList";
import {
	faqsTutorialsListFilteredByTypeView,
	useFaqsTutorialsContext,
} from "../../Hooks/FaqsTutorialsProvider";
import { decodeBase64 } from "../../Share/functions";

const CodeQR = () => {
	const [parametroQR, setParametroQR] = useSearchParams();

	const size = 220;
	const navigate = useNavigate();
	const [qrUrl, setqrUrl] = useState("");
	const [baseSecret, setBaseSecret] = useState("");
	const [verify, setVerify] = useState(false);
	const [validateEmail, setValidateEmail] = useState(false);
	const [code, setCode] = useState("");
	const [filteredFinalFaqsArray, setFilteredFinalFaqsArray] = useState([]);
	const faqsTutorialsList = useFaqsTutorialsContext();

	const getUserProfile = () => {
		getProfileApi().then((response) => {
			sessionStorage.setItem(
				"userData",
				JSON.stringify({
					referralCode: response.data[0].UsersCliReferralCode ?? "",
					usersCliWallets: response.data[0].UsersCliWallets ?? 0,
					UsersCliActivePackages: response.data[0].UsersCliActivePackages ?? 0,
				})
			);
			if (!response.data[0].UsersCliEmailVerified) {
				sendCodeEmail({
					email: response.data[0].UsersCliEmail,
				}).catch((e) => {
					console.log("Error: ", e.response?.data);
					if (e.response?.data.message) {
						alert(e.response?.data.message);
					}
				});
			}
			setValidateEmail(response.data[0].UsersCliEmailVerified);
			setVerify(response.data[0].UsersCli2FAVerified);
			setqrUrl(response.data[0].UsersCli2FASecretOTPAuthUrl);
			setBaseSecret(response.data[0].UsersCli2FASecretBase32);
		});
	};
	const submitAuto = (code) => {
		let emailCodification = decodeBase64(sessionStorage.getItem("id"));
		let data = {
			email: emailCodification,
			token: code,
		};
		if (!validateEmail) {
			validateEmailApi(data)
				.then((res) => {
					if (res.data.verified) {
						window.location.reload();
					} else {
						alert("Not validated");
					}
				})
				.catch((e) => {
					console.log("Error: ", e.response?.data);
					if (e.response?.data.message) {
						alert(e.response?.data.message);
					}
				});
		} else {
			(verify ? qrValidate(data) : qrVerify(data))
				.then((res) => {
					if (res.data.verified) {
						sessionStorage.setItem("validated", "true");
						navigate("/" + parametroQR.get("params"));
					} else {
						alert("Code invalid or expired");
					}
				})
				.catch((e) => {
					console.log("Error: ", e.response?.data);
					if (e.response?.data.message) {
						alert(e.response?.data.message);
					}
				});
		}
	};
	const getLinkReferralCopied = () => {
		navigator.clipboard
			.writeText(baseSecret)
			.then(() => {
				alert("Copied the text: " + baseSecret);
			})
			.catch(() => {
				alert("Unable to copy. Please, manually select the link and copy");
			});
	};
	const filteredFaqsTutorialsListCodeqr = () => {
		setFilteredFinalFaqsArray(
			faqsTutorialsListFilteredByTypeView(faqsTutorialsList, "2", "codeqr").map(
				(itemFaqsTutorialsListFiltered) => {
					return !verify
						? { ...itemFaqsTutorialsListFiltered, isOpenByDefault: true }
						: { ...itemFaqsTutorialsListFiltered, isOpenByDefault: false };
				}
			)
		);
	};

	useEffect(() => {
		getUserProfile();
	}, []);

	useEffect(() => {
		filteredFaqsTutorialsListCodeqr();
	}, [faqsTutorialsList, verify]);

	return (
		<section className="codeqr_wallpapper">
			<div className="subheader_code">
				<Subheader />
			</div>
			<div className="codeqr_expandable_list">
				<ExpandableList faqsTutorialsList={filteredFinalFaqsArray} />
			</div>
			<div className="display_none_center_column_margin">
				<p className="text_codeqr_alert_inicial">
					<b>Site works best with the Twilio Smithy Authenticator App</b>
				</p>
				<div className="display">
					<a href="https://apps.apple.com/us/app/twilio-authy/id494168017?itsct=apps_box_badge&amp;itscg=30200">
						<img
							className="logos_appstore"
							src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1328227200"
							alt="Download on the App Store"
						/>
					</a>
					<a href="https://play.google.com/store/apps/details?id=com.authy.authy&hl=en&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
						<img
							className="logos_googlestore"
							alt="Get it on Google Play"
							src="https://play.google.com/intl/es-419/badges/static/images/badges/en_badge_web_generic.png"
						/>
					</a>
				</div>
				<div className="display">
					<div className="buttonback_container display_left_center">
						<Buttonback action={() => navigate(-1)} />
					</div>
				</div>
				<div className="display">
					{validateEmail && !verify ? (
						// Enviarle parametros a un componente
						<div className="qr_container display">
							<QRCode className="qr" title="CodeQr" value={qrUrl} size={size} />
						</div>
					) : (
						<div></div>
					)}
				</div>
				<div className="display">
					{validateEmail && !verify ? (
						<div className="date_codeqr ">
							<p className="address_codeqr" type="text" readOnly>
								{baseSecret}
							</p>
							<button
								className="button_container_copy_codeqr"
								onClick={getLinkReferralCopied}
							>
								<img src="./Assets/Iconos/Copy.svg" alt="" />
							</button>
						</div>
					) : (
						<div></div>
					)}
				</div>
				<div className="display">
					<div className="title_codeqr-text display_column_center">
						<h2> CONFIRMATION CODE </h2>
						<h3>
							{!validateEmail ? (
								<p className="text_codeqr_container">
									{" "}
									<span className="text_codeqr_alert">
										{" "}
										Email validation. Check your email, write down or copy and
										paste the
									</span>{" "}
									<span className="codeqr_text_enter">
										{" "}
										six digit code.
									</span>{" "}
								</p>
							) : !verify ? (
								<p className="text_codeqr_container">
									<span className="text_codeqr_alert">
										{" "}
										Scan this QR code with your Authenticator, write down or
										copy and paste the
									</span>{" "}
									<span className="codeqr_text_enter">
										{" "}
										six digit code.
									</span>{" "}
								</p>
							) : (
								<p>
									{" "}
									<span className="text_codeqr_alert">
										{" "}
										Check your Authenticator, write down or copy and paste the
									</span>{" "}
									<span className="codeqr_text_enter">
										{" "}
										six digit code.
									</span>{" "}
								</p>
							)}
						</h3>
					</div>
				</div>
				<div className="display">
					<div className="codeqr_numbers-container">
						<div className="display">
							<div className="codeqr_code display">
								<input
									className="number_qr"
									type="text"
									maxLength="6"
									onChange={(e) => {
										setCode(e.target.value);
										if (e.target.value.length === 6) {
											submitAuto(e.target.value);
											document.getElementsByClassName("number_qr")[0].value =
												"";
											setCode("");
										}
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CodeQR;
