import React, { useState } from "react";
import {
	currencyPermitidaPayMe,
	currencyPermitidaProfits,
	DeleteWallet,
	EditWallet,
	headersWalletTable,
} from "../../Share/Constants";
import ButtonCrud from "../ButtonCrud/ButtonCrud";
import ModalEditWallet from "../Modales/ModalEditWallet/ModalEditWallet";
import ModalDeleteWallet from "../Modales/ModalDeleteWallet/ModalDeleteWallet";
import ModalChangeWalletReferral from "../Modales/ModalChangeWalletReferral/ModalChangeWalletReferral";
import ModalCantDelete from "../Modales/ModalCantDelete/ModalCantDelete";
import { updateWallet } from "../../Services/Wallets.api";
import ModalChangeWalletProfits from "../Modales/ModalChangeWalletProfits/ModalChangeWalletProfits";
import "./datatablewallets.css";
import { decodeBase64 } from "../../Share/functions";

const DataTableWallets = ({ datosTablaWallets, optionsList, ...props }) => {
	let contador = 0;

	const getWalletByUser = props.getWalletByUser;
	const [isOpenCantDelete, setIsOpenCantDelete] = useState(false);
	const [openAlertChangeReferral, setOpenAlertChangeReferral] = useState(false);
	const [openAlertChangeProfits, setOpenAlertChangeProfits] = useState(false);
	const [editWallet, setEditWallet] = useState(false);
	const [deleteWallet, setDeleteWallet] = useState(false);

	const [changeForProfits, setChangeForProfits] = useState(false);
	const [changeForReferrals, setChangeForReferrals] = useState(false);
	const [deleteOldWa, setDeleteOldWa] = useState(false);
	const [changeInfoWa, setChangeInfoWa] = useState(false);
	const [information, setInformation] = useState({});

	const asignarInformation = (item, tipo) => {
		setInformation(item);
		if (tipo === "edit") {
			// setEditWallet(true);
			setChangeInfoWa(true);
		}
		if (tipo === "delete") {
			if (item.UsersCliWalletsForReceipt || item.UsersCliWalletsForReferrals) {
				setIsOpenCantDelete(true);
			} else {
				// setDeleteWallet(true);
				setDeleteOldWa(true);
			}
		}
		if (tipo === "changeForProfits") {
			// setChangeForProfits(true);
			setOpenAlertChangeProfits(true);
		}
		if (tipo === "changeForReferrals") {
			// setChangeForReferrals(true);
			setOpenAlertChangeReferral(true);
		}
	};

	/**
	 *  Y @KATHE
	 * CONSUMO EDIT WALLETS
	 */

	const putApiUpdateWallet = (data) => {
		let emailCodification = decodeBase64(sessionStorage.getItem("id"));
		let body = {
			email: emailCodification,
			token: data.token,
		};
		if (data.walletForReceipt) {
			body.walletForReceipt = data.walletForReceipt;
		}
		if (data.walletForReferrals) {
			body.walletForReferrals = data.walletForReferrals;
		}
		let walletId = data.UsersCliWalletsId;
		updateWallet(body, walletId)
			.then((response) => {
				if (response.status === 200) {
					alert(response.data.message);
					getWalletByUser();
					setOpenAlertChangeReferral(false);
					setOpenAlertChangeProfits(false);
				}
			})
			.catch((e) => {
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	return (
		<section className="table_wallets_container">
			<table
				className="table__design__datatable_wallets"
				id="dateTable_PackagesWallets"
			>
				<thead className="table__design__datatable__thead_wallets">
					<tr>
						{headersWalletTable.map((item) => {
							return (
								<th key={item.titulo}>
									<p className="texto__generico__tablabody_wallets">
										{item.titulo}
									</p>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody className="table__design__datatable__tbody">
					{datosTablaWallets?.map((item) => {
						return (
							<tr key={`${(contador += 1)}${item.UsersCliWalletsId}`}>
								<td>
									<p className="texto__generico__tablabody_wallets">
										{item.ExchangesWalletsName}
									</p>
								</td>
								<td>
									<p className="texto__generico__tablabody_wallets display">
										<img
											className="logo__currency__packages"
											src={item.CurrenciesIconUrl}
											// src="./Assets/Iconos/Ethereum.svg"
											alt=""
										/>
										<span className="texto__generico__tablabody_wallets">
											{item.UsersCliWalletsCurrencyId}
										</span>
									</p>
								</td>
								<td>
									<p className="texto__generico__tablabody_wallets">
										{item.UsersCliWalletsAddress}
									</p>
								</td>
								<td>
									<p className="texto__generico__tablabody_wallets">
										{item.UsersCliWalletsName}
									</p>
								</td>
								<td>
									<p className="texto__generico__tablabody_wallets">
										{item.UsersCliWalletsForReferrals}
									</p>
									{currencyPermitidaProfits.includes(
										item.UsersCliWalletsCurrencyId
									) ? (
										<button
											className="button_invisible"
											onClick={() => {
												if (!item.UsersCliWalletsForReferrals) {
													asignarInformation(item, "changeForReferrals");
												}
											}}
										>
											<input
												className="checkbox_round_datatablewallet"
												type="checkbox"
												id="walletsForReceipt"
												name="walletsForReceipt"
												value="Picked"
												checked={item.UsersCliWalletsForReferrals}
												onChange={(value) => {}}
											></input>
										</button>
									) : (
										<p className="dataTableWallets_text_notAvailable">
											Not available
										</p>
									)}
								</td>
								<td>
									<p className="texto__generico__tablabody_wallets">
										{item.UsersCliWalletsForReceipt}
									</p>
									{currencyPermitidaPayMe.includes(
										item.UsersCliWalletsCurrencyId
									) ? (
										<button
											className="button_invisible"
											onClick={() => {
												if (!item.UsersCliWalletsForReceipt) {
													asignarInformation(item, "changeForProfits");
												}
											}}
										>
											<input
												className="checkbox_round_datatablewallet"
												type="checkbox"
												id="walletsForReceipt"
												name="walletsForReceipt"
												checked={item.UsersCliWalletsForReceipt}
												onChange={(value) => {}}
											></input>
										</button>
									) : (
										<p className="dataTableWallets_text_notAvailable">
											Not available
										</p>
									)}
								</td>
								<td className="configuration_button">
									<ButtonCrud
										imagen={EditWallet}
										action={() => asignarInformation(item, "edit")}
									></ButtonCrud>
									<ButtonCrud
										imagen={DeleteWallet}
										action={() => {
											asignarInformation(item, "delete");
										}}
									></ButtonCrud>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<ModalEditWallet
				titulo1={"EDIT WALLET"}
				titulo2={""}
				open={changeInfoWa}
				close={() => setChangeInfoWa(false)}
				backbutton={false}
				information={information}
				getWalletByUser={getWalletByUser}
				optionsList={optionsList}
			/>
			<ModalDeleteWallet
				titulo1={"DELETE WALLET"}
				titulo2={""}
				open={deleteOldWa}
				close={() => setDeleteOldWa(false)}
				backbutton={false}
				information={information}
				getWalletByUser={getWalletByUser}
			/>
			<ModalCantDelete
				titulo1={"CAN’T BE DELETED"}
				titulo2={""}
				open={isOpenCantDelete}
				backbutton={true}
				close={() => setIsOpenCantDelete(false)}
				information={information}
			/>
			<ModalChangeWalletReferral
				titulo1={"CHANGE WALLET FOR REFERRAL"}
				titulo2={""}
				open={openAlertChangeReferral}
				close={() => setOpenAlertChangeReferral(false)}
				backbutton={false}
				putApiUpdateWallet={putApiUpdateWallet}
				information={information}
			/>
			<ModalChangeWalletProfits
				titulo1={"CHANGE WALLET TO RECEIVE PROFITS"}
				titulo2={""}
				open={openAlertChangeProfits}
				close={() => setOpenAlertChangeProfits(false)}
				backbutton={false}
				putApiUpdateWallet={putApiUpdateWallet}
				information={information}
			/>
		</section>
	);
};

export default DataTableWallets;
