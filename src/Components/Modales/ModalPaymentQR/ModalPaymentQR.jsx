import React, { useEffect, useState } from "react";

import Bigbutton from "../../BigButtons/Bigbutton";
import QRCode from "react-qr-code";
import Modal from "../Modal/Modal";

import { getMasterWallets } from "../../../Services/MasterWallets.api";

import "./modalpaymentqr.css";
// import { set } from "react-hook-form";

const ModalPaymentQR = ({
	open,
	close,
	titulo1,
	titulo2,
	totalToPay,
	totalReceived,
	...props
}) => {
	const size = 150;

	/**
	 *
	 * useState para traer las masterwallets
	 */
	const [dataMasterWallets, setDataMasterWallets] = useState([]);

	const getAllMasterWallets = () => {
		getMasterWallets()
			.then((res) => {
				if (res.data.length > 0) {
					setDataMasterWallets(res.data);
				}
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	/* 
    // Funciones para copiar textos a portapeles
    */
	// const selectCurrency = props.selectCurrency;
	const [selectCurrency, setSelectCurrency] = useState(
		props.selectCurrency
	);
	const [qrUrl, setqrUrl] = useState("");
	const [currencyPayment, setCurrencyPayment] = useState("");

	const getUrlMasterWallet = () => {
		dataMasterWallets.forEach((item) => {
			if (item.CurrenciesId === selectCurrency) {
				setqrUrl(item.MWalletsAddres);
				setCurrencyPayment(item.CurrenciesId);
			}
		});
	};

	const getLinkReferralCopied = () => {
		navigator.clipboard
			.writeText(qrUrl)
			.then(() => {
				alert("Copied the text: " + qrUrl);
			})
			.catch(() => {
				alert(
					"Unable to copy. Please, manually select the link and copy"
				);
			});
	};

	useEffect(() => {
		getAllMasterWallets();
	}, []);

	useEffect(() => {
		getUrlMasterWallet();
	}, [dataMasterWallets, selectCurrency]);

	useEffect(() => {
		setSelectCurrency(props.selectCurrency);
	}, [props.selectCurrency]);

	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
		>
			<div className="grid_modal_paymentqr">
				<div>
					<h1 className="title_paymentqr display">
						{" "}
						Pending Payment{" "}
					</h1>
				</div>
				<div className="display">
					<p className="p_modal_paymentqr_alert">
						{" "}
						<b> Scroll down to see important information ↓ </b>
						<br />
						<br />
						This wallet address in the QR Code and the textbox is the
						CryptoProgram's Wallet you must send funds TO with the
						currency you selected. This is NOT YOUR wallet address,
						this is the wallet address to send funds TO. Please ensure
						that you send the funds to this exact wallet by copying
						the wallet address or scanning the QR Code.
					</p>
				</div>
				<div className="display">
					<div className="codigoqr_paymentqr-container display">
						{qrUrl && qrUrl.length > 0 && (
							// Enviarle parametros a un componente
							<QRCode
								className="qr_payment"
								title="CodeQr"
								value={qrUrl}
								size={size}
							/>
						)}
					</div>
				</div>

				<div className="display">
					<div className="date_modal_paymentqr ">
						<p
							className="address_modal_paymentqr"
							type="text"
							readOnly
						>
							{qrUrl}
						</p>
						<button
							className="button_container_copy"
							onClick={getLinkReferralCopied}
						>
							<img src="./Assets/Iconos/Copy.svg" alt="" />
						</button>
					</div>
				</div>
				<div className="display">
					<div className="p_modal_paymentqr_container">
						<p className="p_modal_paymentqr">
							The payment is in a pending state, when the system
							confirms payment, the packages will change to an active
							state. Please remember to take into account the network/gas fees that could reduce the balance sent, to avoid CryptoProgram receiving less funds than necessary to activate your package, and requiring you to send further funds to add up to the total amount of the package(s) purchased.
							<br />
							<br />
							<b> {totalReceived > 0 ? `We received your payment of ${totalReceived} ${currencyPayment}. Your outstanding amount to send is ${totalToPay - totalReceived} ${currencyPayment}. Please make an additional deposit so your transaction can be activated.` : `Your amount to send is ${totalToPay} ${currencyPayment}.`} </b>
							<br />
							<br />
						</p>

						<p className="p_modal_paymentqr_alert">
							If the payment isn't confirmed in <b> 12 hours </b>, the
							package will be rejected.
							<br />
							<br />
						</p>
						<p className="p_modal_paymentqr">
							This wallet address is <b> {currencyPayment} </b>. DO
							NOT send any other crypto currency to this address other
							than <b> {currencyPayment} </b> or your money will be lost and most
							likely never recovered. CryptoProgram.me is not
							responsible if you don't send the proper crypto to the
							same network address displayed on this page. There is no
							need to send any type of confirmation that your packages
							was purchased to us. Our system is automated and you
							will be notified by email once you have sent the amount
							of funds to purchase your package. Any amount of funds
							over the full amount required for your package will not
							be credited for future purchases. If you don't send the
							full amount your package(s) won't be confirmed in the
							system which will require you to send the additional
							amount you are short to pay for your package(s) in full.
						</p>
					</div>
				</div>
				<div className="display">
					<Bigbutton
						action={close}
						className="button_accept_paymentqr"
					>
						{" "}
						Accept{" "}
					</Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalPaymentQR;
