import React, { useState, useEffect } from "react";
import "./profits.css";

import Layoutmu from "../../Components/Layouts/LayoutMU/Layoutmu";
import FirstlevelEmpty from "./Empty/FirstlevelEmpty";
import FirstLevel from "./Full/FirstLevel";
import Secondlevel from "./Full/SecondLevel";
import SecondlevelEmpty from "./Empty/SecondlevelEmpty";
import ProfitsData from "./ProfitsData/ProfitsData";
import ProfitsDataReferrals from "./ProfitsData/ProfitsDataReferrals";
import { getProfileApi } from "../../Services/Profile.api";
import ButtonOption from "../../Components/ButtonOptions/ButtonOption";
import {
	getPackageEmail,
	getPackagesTierOneReferralsByEmail,
	getPackagesTierTwoReferralsByEmail,
} from "../../Services/Packages.api";
import { getReferralsUserApi } from "../../Services/Referrals.api";
import { getWallets } from "../../Services/Wallets.api";
import { getProfitsApi } from "../../Services/Profits.api";
import { referralLinkBaseUrl } from "../../Share/Constants";
import TotalReferrals from "./ProfitsData/TotalReferrals";
import TotalReferralsTT from "./ProfitsData/TotalReferralsTT";
import SupportComponent from "../../Components/SupportComponent/SupportComponent";
import ReferralLeaderBoard from "./ProfitsData/ReferralLeaderBoard";

const Profits = () => {
	const [optionProfit, setOptionProfit] = useState(1);
	const [referralCode, setReferralCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [dataPackagesReferrals, setDataPackagesReferrals] = useState([]);
	const [dataPackagesReferralsTierOne, setDataPackagesReferralsTierOne] =
		useState([]);
	const [dataPackagesReferralsTierTwo, setDataPackagesReferralsTierTwo] =
		useState([]);
	const [referralsTierOne, setReferralsTierOne] = useState([]);
	const [referralsTierTwo, setReferralsTierTwo] = useState([]);
	const [walletProfitsReferral, setWalletProfitsReferral] = useState();
	const [profitsResponse, setProfitsResponse] = useState();
	const [referralsTierOneNumber, setReferralsTierOneNumber] = useState(0);
	const [referralsTierTwoNumber, setReferralsTierTwoNumber] = useState(0);
	const [totalPackagesActiveReferral, setTotalPackagesActiveReferral] =
		useState(0);
	const [
		totalPackagesActiveTotalsTierOne,
		setTotalPackagesActiveTotalsTierOne,
	] = useState(0);
	const [
		totalPackagesActiveTotalsTierTwo,
		setTotalPackagesActiveTotalsTierTwo,
	] = useState(0);
	const [tierOneReferralsInformation, setTierOneReferralsInformation] =
		useState();
	const [tierTwoReferralsInformation, setTierTwoReferralsInformation] =
		useState();
	// valores para tier one y two
	const [
		totalNumberOfActivePackagesTotalPurchased,
		setTotalNumberOfActivePackagesTotalPurchased,
	] = useState(0);
	const [
		totalNumberOfActivePackagesTotalReturn,
		setTotalNumberOfActivePackagesTotalReturn,
	] = useState(0);

	// para valores de total tier one y tier two
	const [
		totalNumberOfActivePackagesTotalPurchasedTierOne,
		setTotalNumberOfActivePackagesTotalPurchasedTierOne,
		,
	] = useState(0);
	const [
		totalNumberOfActivePackagesTotalReturnTierOne,
		setTotalNumberOfActivePackagesTotalReturnTierOne,
	] = useState(0);
	const [
		totalNumberOfActivePackagesTotalPurchasedTierTwo,
		setTotalNumberOfActivePackagesTotalPurchasedTierTwo,
	] = useState(0);
	const [
		totalNumberOfActivePackagesTotalReturnTierTwo,
		setTotalNumberOfActivePackagesTotalReturnTierTwo,
	] = useState(0);

	const linkReferralShare = `${referralLinkBaseUrl}${referralCode}`;

	const getLinkReferralCopied = () => {
		navigator.clipboard
			.writeText(linkReferralShare)
			.then(() => {
				alert("Copied the text: " + linkReferralShare);
			})
			.catch(() => {
				alert("Unable to copy. Please, manually select the link and copy");
			});
	};

	const getProfits = () => {
		getProfitsApi().then((response) => {
			if (response.status === 200) {
				setProfitsResponse(response.data);
			} else {
				setProfitsResponse();
			}
		});
	};

	const getReferrals = () => {
		setLoading(true);
		getReferralsUserApi()
			.then((response) => {
				let bodyReferralsTierOne = [];
				let bodyReferralsTierTwo = [];
				response.data.tierOneReferrals?.map((item) => {
					return bodyReferralsTierOne.push({
						value: item.UsersCliEmail,
						label: `${item.UsersCliFirstName} ${item.UsersCliLastName} \n${item.UsersCliEmail}`,
					});
				});
				setReferralsTierOneNumber(response.data?.tierOneReferrals?.length ?? 0);
				response.data.tierTwoReferrals?.map((item) => {
					return bodyReferralsTierTwo.push({
						value: item.UsersCliEmail,
						label: `${item.UsersCliFirstName} ${item.UsersCliLastName}`,
					});
				});
				setReferralsTierTwoNumber(response.data?.tierTwoReferrals?.length ?? 0);
				if (response.data) {
					setReferralsTierOne(bodyReferralsTierOne);
					setReferralsTierTwo(bodyReferralsTierTwo);
				}
				setTierOneReferralsInformation(response.data.tierOneReferrals);
				setTierTwoReferralsInformation(response.data.tierTwoReferrals);
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const getTotalNumberOfActivePackages = (data) => {
		const totalNumberPackagesActive = data.reduce(
			(accumulator, currentValue) => {
				return (
					accumulator +
					(currentValue.PackagesState === "2" ||
					currentValue.PackagesState === "3"
						? currentValue.PackagesNumber
						: 0)
				);
			},
			0
		);
		return totalNumberPackagesActive;
	};

	const getTotalNumberOfActivePackagesTotalPurchased = (data) => {
		const totalNumberOfActivePackagesTotalPurchased = data.reduce(
			(accumulator, currentValue) => {
				return (
					accumulator +
					(currentValue.PackagesState === "2" ||
					currentValue.PackagesState === "3"
						? currentValue.PackagesTotalAmount
						: 0)
				);
			},
			0
		);
		return totalNumberOfActivePackagesTotalPurchased;
	};

	const getTotalNumberOfActivePackagesTotalReturn = (data) => {
		const totalNumberOfActivePackagesTotalReturn = data.reduce(
			(accumulator, currentValue) => {
				return (
					accumulator +
					(currentValue.PackagesState === "2" ||
					currentValue.PackagesState === "3"
						? currentValue.TotalReturn
						: 0)
				);
			},
			0
		);
		return totalNumberOfActivePackagesTotalReturn;
	};
	/**
	 *
	 * Consumo del profile para obtener el referral code
	 */

	const getProfile = () => {
		setLoading(true);
		getProfileApi()
			.then((response) => {
				setLoading(false);
				if (response.data.length > 0) {
					let user = response.data[0];
					setReferralCode(user.UsersCliReferralCode);
				}
			})
			.catch(function (error) {
				setLoading(false);
				console.log("Error: " + [error]);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	/**
	 *
	 * consumo de web services para obtener las wallets del usuario.
	 */
	const getWalletsUser = () => {
		getWallets()
			.then((res) => {
				if (res.data.length > 0) {
					res.data.forEach((element) => {
						if (element.UsersCliWalletsForReferrals) {
							setWalletProfitsReferral(element);
						}
					});
				} else {
					setWalletProfitsReferral();
				}
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	/**
	 *
	 * Funcion para realizar el consumo del getPackage
	 */

	const getPackagesApi = (userEmail) => {
		getPackageEmail(userEmail)
			.then((response) => {
				if (response.data.length > 0) {
					setDataPackagesReferrals(response.data);
					setTotalPackagesActiveReferral(
						getTotalNumberOfActivePackages(response.data)
					);
					setTotalNumberOfActivePackagesTotalPurchased(
						getTotalNumberOfActivePackagesTotalPurchased(response.data)
					);
					setTotalNumberOfActivePackagesTotalReturn(
						getTotalNumberOfActivePackagesTotalReturn(response.data)
					);
				} else {
					setDataPackagesReferrals([]);
					setTotalPackagesActiveReferral(0);
					setTotalNumberOfActivePackagesTotalPurchased(0);
					setTotalNumberOfActivePackagesTotalReturn(0);
				}
			})
			.catch((error) => {
				console.log("Error: ", error.response?.data);
				if (error.response?.data.message) {
					alert(error.response?.data.message);
				}
			});
	};

	/**
	 *
	 * Funcion para realizar el consumo del getPackage tier one referrals
	 */

	const getPackagesReferralsTierOneApi = () => {
		getPackagesTierOneReferralsByEmail()
			.then((response) => {
				if (response.data.length > 0) {
					setDataPackagesReferralsTierOne(response.data);
					setTotalPackagesActiveTotalsTierOne(
						getTotalNumberOfActivePackages(response.data)
					);
					setTotalNumberOfActivePackagesTotalPurchasedTierOne(
						getTotalNumberOfActivePackagesTotalPurchased(response.data)
					);
					setTotalNumberOfActivePackagesTotalReturnTierOne(
						getTotalNumberOfActivePackagesTotalReturn(response.data)
					);
				} else {
					setDataPackagesReferralsTierOne([]);
					setTotalPackagesActiveTotalsTierOne(0);
					setTotalNumberOfActivePackagesTotalPurchasedTierOne(0);
					setTotalNumberOfActivePackagesTotalReturnTierOne(0);
				}
			})
			.catch((error) => {
				console.log("Error: ", error.response?.data);
				if (error.response?.data.message) {
					alert(error.response?.data.message);
				}
			});
	};

	/**
	 *
	 * Funcion para realizar el consumo del getPackage tier two referrals
	 */

	const getPackagesReferralsTierTwoApi = () => {
		getPackagesTierTwoReferralsByEmail()
			.then((response) => {
				if (response.data.length > 0) {
					setDataPackagesReferralsTierTwo(response.data);
					setTotalPackagesActiveTotalsTierTwo(
						getTotalNumberOfActivePackages(response.data)
					);
					setTotalNumberOfActivePackagesTotalPurchasedTierTwo(
						getTotalNumberOfActivePackagesTotalPurchased(response.data)
					);
					setTotalNumberOfActivePackagesTotalReturnTierTwo(
						getTotalNumberOfActivePackagesTotalReturn(response.data)
					);
				} else {
					setDataPackagesReferralsTierTwo([]);
					setTotalPackagesActiveTotalsTierTwo(0);
					setTotalNumberOfActivePackagesTotalPurchasedTierTwo(0);
					setTotalNumberOfActivePackagesTotalReturnTierTwo(0);
				}
			})
			.catch((error) => {
				console.log("Error: ", error.response?.data);
				if (error.response?.data.message) {
					alert(error.response?.data.message);
				}
			});
	};

	/**
	 *
	 * funciones para el cambio de opciones a partir de los botones.
	 */

	const buttonOneAction = () => {
		setOptionProfit(1);
	};
	const buttonTwoAction = () => {
		setOptionProfit(2);
		setDataPackagesReferrals([]);
		setTotalPackagesActiveReferral(0);
		setTotalNumberOfActivePackagesTotalPurchased(0);
		setTotalNumberOfActivePackagesTotalReturn(0);
	};
	const buttonThreeAction = () => {
		setOptionProfit(3);
		setDataPackagesReferrals([]);
		setTotalPackagesActiveReferral(0);
		setTotalNumberOfActivePackagesTotalPurchased(0);
		setTotalNumberOfActivePackagesTotalReturn(0);
	};
	const buttonFourAction = () => {
		setOptionProfit(4);
	};

	useEffect(() => {
		getProfile();
		getReferrals();
		getPackagesApi();
		getPackagesReferralsTierOneApi();
		getPackagesReferralsTierTwoApi();
		getWalletsUser();
		getProfits();
		// document.getElementById(""); comentario hecho en profits.jsx
	}, []);

	const navigationButtonProfits = (optionProfit) => {
		switch (optionProfit) {
			case 1:
				return (
					<div>
						<ProfitsData profitsResponse={profitsResponse} />
						<br />
						<br />
						<ReferralLeaderBoard />
						<br />
						<br />
						<ProfitsDataReferrals
							referralsTierOneNumber={referralsTierOneNumber}
							referralsTierTwoNumber={referralsTierTwoNumber}
							profitsResponse={profitsResponse}
							referralCode={referralCode}
							linkReferralShare={linkReferralShare}
							getLinkReferralCopied={getLinkReferralCopied}
						/>
						<br />
						<br />
					</div>
				);
			// break;

			case 2:
				return (
					<>
						<div className="panels_profits">
							<div className="text_active_container">
								<p className="packages_active_green">
									Tier One Selected Active Packages:{" "}
									{totalPackagesActiveReferral}
								</p>
								<p className="packages_active_green">
									Total Purchased in Crypto:{" "}
									{totalNumberOfActivePackagesTotalPurchased}
								</p>
								<p className="packages_active_green">
									Your Total Commissions Payout:{" "}
									{totalNumberOfActivePackagesTotalReturn}
								</p>
							</div>
							<div className="disclaimer_text_packages_container display">
								<p className="disclaimer_text_packages_bold2">
									<b>
										<span className="disclaimer_text_packages">NOTE:</span> ALL
										Payout types, residual, referral commissions, cancelled
										payments will be paid out Before Midnight EST. Anytime
										during the day/night of the payout date.
									</b>
								</p>
							</div>
							{referralsTierOne.length !== 0 ? (
								// {loading ? <Louding/> :
								<>
									<FirstLevel
										getPackagesApi={getPackagesApi}
										referralsTierOne={referralsTierOne}
										dataPackagesReferrals={dataPackagesReferrals}
										referralCode={referralCode}
										linkReferralShare={linkReferralShare}
										walletProfitsReferral={walletProfitsReferral}
										getLinkReferralCopied={getLinkReferralCopied}
									/>
								</>
							) : (
								// }
								<FirstlevelEmpty
									referralCode={referralCode}
									linkReferralShare={linkReferralShare}
									getLinkReferralCopied={getLinkReferralCopied}
								/>
							)}
						</div>
						<br />
					</>
				);

			case 3:
				return (
					<>
						<div className="panels_profits">
							<div className="text_active_container">
								<p className="packages_active_green">
									Tier Two Selected Active Packages:{" "}
									{totalPackagesActiveReferral}
								</p>
								<p className="packages_active_green">
									Total Purchased in Crypto:{" "}
									{totalNumberOfActivePackagesTotalPurchased}
								</p>
								<p className="packages_active_green">
									Your Total Commissions Payout:{" "}
									{totalNumberOfActivePackagesTotalReturn}
								</p>
							</div>
							<div className="disclaimer_text_packages_container display">
								<p className="disclaimer_text_packages_bold2">
									<b>
										<span className="disclaimer_text_packages">NOTE:</span> ALL
										Payout types, residual, referral commissions, cancelled
										payments will be paid out Before Midnight EST. Anytime
										during the day/night of the payout date.
									</b>
								</p>
							</div>
							{referralsTierTwo.length !== 0 ? (
								<Secondlevel
									referralCode={referralCode}
									getPackagesApi={getPackagesApi}
									referralsTierTwo={referralsTierTwo}
									linkReferralShare={linkReferralShare}
									dataPackagesReferrals={dataPackagesReferrals}
									walletProfitsReferral={walletProfitsReferral}
									getLinkReferralCopied={getLinkReferralCopied}
								/>
							) : (
								<SecondlevelEmpty
									referralCode={referralCode}
									linkReferralShare={linkReferralShare}
									getLinkReferralCopied={getLinkReferralCopied}
								/>
							)}
						</div>
						<br />
					</>
				);
			case 4:
				return (
					<div>
						<TotalReferrals
							totalPackagesActiveTotalsTierOne={
								totalPackagesActiveTotalsTierOne
							}
							// getPackagesReferralsTierOneApi={getPackagesReferralsTierOneApi}
							dataPackagesReferralsTierOne={dataPackagesReferralsTierOne}
							referralsTierOne={tierOneReferralsInformation}
							totalNumberOfActivePackagesTotalPurchasedTierOne={
								totalNumberOfActivePackagesTotalPurchasedTierOne
							}
							totalNumberOfActivePackagesTotalReturnTierOne={
								totalNumberOfActivePackagesTotalReturnTierOne
							}
						/>
						<TotalReferralsTT
							totalPackagesActiveTotalsTierTwo={
								totalPackagesActiveTotalsTierTwo
							}
							// getPackagesReferralsTierTwoApi={getPackagesReferralsTierTwoApi}
							dataPackagesReferralsTierTwo={dataPackagesReferralsTierTwo}
							referralsTierTwo={tierTwoReferralsInformation}
							totalNumberOfActivePackagesTotalPurchasedTierTwo={
								totalNumberOfActivePackagesTotalPurchasedTierTwo
							}
							totalNumberOfActivePackagesTotalReturnTierTwo={
								totalNumberOfActivePackagesTotalReturnTierTwo
							}
						/>
						<br />
						<br />
					</div>
				);

			default:
				break;
		}
	};

	return (
		<Layoutmu loading={loading}>
			<section className="profits_container_dad">
				<div className="buttons_tab_container display_evenly">
					<ButtonOption
						selectedValue={optionProfit}
						buttonValue={1}
						action={buttonOneAction}
					>
						{" "}
						Profits{" "}
					</ButtonOption>
					<ButtonOption
						selectedValue={optionProfit}
						buttonValue={2}
						action={buttonTwoAction}
					>
						{" "}
						Tier one referral{" "}
					</ButtonOption>
					<ButtonOption
						selectedValue={optionProfit}
						buttonValue={3}
						action={buttonThreeAction}
					>
						{" "}
						Tier two referral{" "}
					</ButtonOption>
					<ButtonOption
						selectedValue={optionProfit}
						buttonValue={4}
						action={buttonFourAction}
					>
						{" "}
						Total referrals{" "}
					</ButtonOption>
				</div>
				<div className="display">
					<div>{navigationButtonProfits(optionProfit)}</div>
				</div>
				<div>
					<SupportComponent />
				</div>
			</section>
		</Layoutmu>
	);
};

export default Profits;
