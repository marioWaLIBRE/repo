import React from "react";
import { blockExplorerInfoByCurrency } from "../../../Share/Constants";
import Bigbutton from "../../BigButtons/Bigbutton";
import Modal from "../Modal/Modal";

import "./modalhashtransaction.css";

const ModalHashTransaction = ({
	titulo1,
	titulo2,
	open,
	close,
	backbutton,
	optionsView,
	infoPckPurchaseTransaction,
	infoPaymentTransactions,
}) => {
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
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<section className="modalHashTransaction_container">
				{infoPckPurchaseTransaction?.length > 0 ||
				infoPaymentTransactions?.length > 0 ? (
					<div className="">
						{(optionsView === 1
							? infoPckPurchaseTransaction
							: infoPaymentTransactions
						)?.map((item) => {
							const paymentsDateTime =
								item.PaymentsPaymentDateTime ?? item.PaymentsDate;
							const blockExplorerInfo = blockExplorerInfoByCurrency.filter(
								(itemFilter) => {
									return item.PaymentsCurrency === itemFilter.currency;
								}
							)[0];
							return (
								<div
									className="display_center_center"
									key={`${item.PaymentsId} ${item.PaymentsTransactionHash}`}
								>
									<div className="transaction_payments_card_packages ">
										<p className="payments_data_text_packages">
											Amount:{" "}
											<span className="payments_data_text_packages_light">
												{item.PaymentsAmount + " " + item.PaymentsCurrency}
											</span>
										</p>
										<p className="payments_data_text_packages">
											Date:{" "}
											<span className="payments_data_text_packages_light">
												{paymentsDateTime.split("T")[0]}
											</span>
											&nbsp; &nbsp; Hour:{" "}
											<span className="payments_data_text_packages_light">
												{getFinalHourAMPM(paymentsDateTime)}
											</span>
										</p>
										<p className="payments_data_text_packages">
											Wallet:{" "}
											<span className="payments_data_text_packages_light">
												{item.PaymentsWalletAdressTo}
											</span>
										</p>
										<p className="payments_data_text_packages">
											Description:{" "}
											<span className="payments_data_text_packages_light">
												{item.PaymentsReason}
											</span>
										</p>
										<p className="payments_data_text_packages">
											Transaction hash:{" "}
											<span className="payments_data_text_packages_light_link">
												<a
													className="payments_data_text_packages_link"
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
				) : (
					<div className="noTransactionsFound display_center_center">
						<p className="">No transactions found</p>
					</div>
				)}
			</section>
		</Modal>
	);
};

export default ModalHashTransaction;
