import React, { useState } from "react";
import { useEffect } from "react";
import { blockExplorerInfoByCurrency } from "../../../Share/Constants";

import "./packagesFull.css";

const Transactions = ({ paymentsTransactions }) => {
	const [paymentsTransactionsChild, setPaymentsTransactionsChild] = useState(
		[]
	);

	useEffect(() => {
		setPaymentsTransactionsChild(paymentsTransactions);
	}, [paymentsTransactions]);

	const getFinalHourAMPM = (rawHour) => {
		const hourTransaction = rawHour
			.split("T")[1]
			.substring(0, rawHour.split("T")[1].length - 5);
		const hours = hourTransaction.substring(0, 2);
		const newHoursTransaction = parseInt(hours) - 12;
		const AMPM = newHoursTransaction < 0 ? "AM" : "PM";
		const finalHour =
			(newHoursTransaction < 0
				? hourTransaction
				: newHoursTransaction.toString() +
				  hourTransaction.substring(2, hourTransaction.length)) +
			" " +
			AMPM;
		return finalHour;
	};

	return (
		<div className="transactions_payments_container display_column_center_center">
			<div className="noSelectedWallet_alert_container">
				<p className="noSelectedWallet_alert">
					The transaction does not show up in your wallet? Please go the the FAQ
					for further info
				</p>
			</div>
			<div className="transactions_payments">
				{paymentsTransactionsChild?.map((item) => {
					const paymentsDateTime =
						item.PaymentsPaymentDateTime ?? item.PaymentsDate;
					const blockExplorerInfo = blockExplorerInfoByCurrency.filter(
						(itemFilter) => {
							return item.PaymentsCurrency === itemFilter.currency;
						}
					)[0];
					return (
						<div className="display_center_center" key={item.PaymentsId}>
							<div className="transaction_payments_card ">
								<p className="payments_data_text">
									Amount:{" "}
									<span className="payments_data_text_light">
										{item.PaymentsAmount + " " + item.PaymentsCurrency}
									</span>
								</p>
								<p className="payments_data_text">
									Date:{" "}
									<span className="payments_data_text_light">
										{paymentsDateTime.split("T")[0]}
									</span>
									&nbsp; &nbsp; Hour:{" "}
									<span className="payments_data_text_light">
										{getFinalHourAMPM(paymentsDateTime)}
									</span>
								</p>
								<p className="payments_data_text">
									Wallet:{" "}
									<span className="payments_data_text_light">
										{item.PaymentsWalletAdressTo}
									</span>
								</p>
								<p className="payments_data_text">
									Description:{" "}
									<span className="payments_data_text_light">
										{item.PaymentsReason}
									</span>
								</p>
								<p className="payments_data_text">
									Package(s) Of:{" "}
									<span className="payments_data_text_light">
										{item.PackagesOwner}
									</span>
								</p>
								<p className="payments_data_text">
									Transaction hash:{" "}
									<span className="payments_data_text_light_link">
										<a
											className="payments_data_text_link"
											href={
												item.PaymentsTransactionHash &&
												(item.PaymentsTransactionHash ?? "").length > 0
													? blockExplorerInfo.baseUrlTransactionByHash +
													  item.PaymentsTransactionHash
													: blockExplorerInfo.baseUrlAddress +
													  item.PaymentsWalletAdressTo
											}
											target="_blank"
										>
											{item.PaymentsTransactionHash &&
											(item.PaymentsTransactionHash ?? "").length > 0
												? item.PaymentsTransactionHash
												: "Not available, search the transaction in your wallet"}
										</a>
									</span>
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Transactions;
