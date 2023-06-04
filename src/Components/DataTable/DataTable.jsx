import React, { useState, useEffect } from "react";
import "./datatable.css";
import Smallbutton from "../../Components/SmallButtons/Smallbutton";
import { headersTable, statePackages } from "../../Share/Constants";
import { putPackagesState } from "../../Services/Packages.api";
import ModalCancelPackage from "../Modales/ModalPackageCancel/ModalCancelPackage";
import ModalReactivatePackage from "../Modales/ModalPackageCancel/ModalReactivatePackage";
import ModalGoogle from "../Modales/ModalGoogle/ModalGoogle";
import ModalHashTransaction from "../Modales/ModalHashTransaction/ModalHashTransaction";
import ModalRejectPackage from "../Modales/ModalRejectPackage/ModalRejectPackage";
import { decodeBase64, encodeBase64 } from "../../Share/functions";

const DataTable = ({
	contenidoTable,
	setTotalToPay,
	setTotalReceived,
	setIsOpenPayment,
	filterState,
	filterInitialDate,
	filterFinalDate,
	infoPckPurchaseTransaction,
	infoPaymentTransactions,
	getInfoPckPurchaseTransaction,
	getInfoPaymentTransactions,
	...props
}) => {
	let contador = 0;
	const [orderByColumnId, setOrderByColumnId] = useState("0");
	/**
	 *
	 * Ordenamiento de las columnas de la tabla
	 */
	const [asc, setAsc] = useState(true);
	const [tableOrdered, setTableOrdered] = useState(contenidoTable);
	const [cancelPackage, setCancelPackage] = useState(false);
	const [reactivatePackage, setReactivatePackage] = useState(false);
	const [rejectPackage, setRejectPackage] = useState(false);
	const [informationPackage, setInformationPackage] = useState({});
	const [openModalHash, setOpenModalHash] = useState(false);
	const [optionsView, setOptionsView] = useState(0);

	/**
	 *
	 * use Effect que me permite observar el comportamiento del contenidoTable para que cuando este presente cambios, se redibuje nuevamente su contenido en la tabla
	 */
	useEffect(() => {
		setTableOrdered(contenidoTable);
	}, [contenidoTable]);

	const optionViewOne = (PackagesId) => {
		getInfoPckPurchaseTransaction(PackagesId);
		setOptionsView(1);
		setOpenModalHash(true);
	};

	const optionViewTwo = (PackagesId, email) => {
		let emailCodification = encodeBase64(email);
		getInfoPaymentTransactions(PackagesId, emailCodification);
		setOptionsView(2);
		setOpenModalHash(true);
	};

	const asignarAccionPackages = (packageInfo, actionPackage) => {
		setInformationPackage(packageInfo);
		if (actionPackage === "cancelPackage") {
			// setCancelPackageAction(true);
			setCancelPackage(true);
		}
		if (actionPackage === "reactivatePackage") {
			// setReactivatePackageAction(true);
			setReactivatePackage(true);
		}
		if (actionPackage === "rejectPackage") {
			// setRejectPackageAction(true);
			setRejectPackage(true);
		}
	};

	const colorState = (state) => {
		return statePackages?.filter((item) => item.id === state)[0];
	};

	/**
	 *
	 * Función para pasarle los paquetes
	 */
	const getPackage = props.getPackage;
	/**
	 *
	 * Función para abrir payment QR con los datos de la master wallet
	 */
	const functionViewQR = (item) => {
		if (props.setSelectCurrencyFromPackages) {
			props.setSelectCurrencyFromPackages(item.PackagesCurrency);
		}
		setTotalToPay(item.PackagesTotalAmount + item.PackagesAffiliateAmount);
		setTotalReceived(item.TotalReceived);
		// props.setSelectCurrencyFromPackages(PackagesCurrency);
		setIsOpenPayment(true);
	};
	/**
	 *
	 * Función para poner en cancelación un paquete
	 */
	const updateStatePackage = (PackagesId, active, token) => {
		let emailCodification = decodeBase64(sessionStorage.getItem("id"));
		let data = {
			PackagesId,
			body: { active, email: emailCodification, token },
		};
		putPackagesState(data)
			.then((response) => {
				let message = response.data.message;
				console.log("response", response);
				alert(message);
				getPackage();
				if (response.status === 200) {
					setCancelPackage(false);
					setReactivatePackage(false);
					setRejectPackage(false);
				}
			})
			.catch((e) => {
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	const getDataFilter = (id) => {
		setAsc(!asc);
		switch (id) {
			case 1:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return a.PackagesState - b.PackagesState;
						} else {
							return b.PackagesState - a.PackagesState;
						}
					});
				});
				break;
			case 2:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return a.PackagesNumber - b.PackagesNumber;
						} else {
							return b.PackagesNumber - a.PackagesNumber;
						}
					});
				});
				break;
			case 3:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return a.PackagesTotalAmount - b.PackagesTotalAmount;
						} else {
							return b.PackagesTotalAmount - a.PackagesTotalAmount;
						}
					});
				});
				break;
			case 4:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return (
								new Date(a.PackagesDateReceived) -
								new Date(b.PackagesDateReceived)
							);
						} else {
							return (
								new Date(b.PackagesDateReceived) -
								new Date(a.PackagesDateReceived)
							);
						}
					});
				});
				break;
			case 5:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return a.PackagesCycle - b.PackagesCycle;
						} else {
							return b.PackagesCycle - a.PackagesCycle;
						}
					});
				});
				break;
			case 6:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return (
								new Date(a.PackagesLastReceipt) -
								new Date(b.PackagesLastReceipt)
							);
						} else {
							return (
								new Date(b.PackagesLastReceipt) -
								new Date(a.PackagesLastReceipt)
							);
						}
					});
				});
				break;
			case 7:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return a.PackagesAmountToReceive - b.PackagesAmountToReceive;
						} else {
							return b.PackagesAmountToReceive - a.PackagesAmountToReceive;
						}
					});
				});
				break;
			case 8:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return a.PackagesCurrency > b.PackagesCurrency;
						} else {
							return b.PackagesCurrency > a.PackagesCurrency;
						}
					});
				});
				break;
			case 9:
				setTableOrdered((tableOrdered) => {
					return tableOrdered.sort((a, b) => {
						if (asc) {
							return a.TotalReturn > b.TotalReturn;
						} else {
							return b.TotalReturn > a.TotalReturn;
						}
					});
				});
				break;
			default:
		}
	};

	return (
		<section className="table_date_container">
			<table
				className="table__design__datatable"
				id="dateTable_PackagesUser"
				data-cols-width="15,20,25,20,20,15,20,20,20,20,20"
			>
				<thead className="table__design__datatable__thead">
					<tr data-height="15">
						{headersTable.map((item) => {
							return (
								<th
									data-a-h="center"
									data-f-bold="true"
									data-b-a-s="double"
									key={item.titulo}
								>
									<div className="headersTable_container">
										<p
											className={
												item.id !== orderByColumnId
													? "texto__generico__tablabody"
													: "texto__generico__tablabody header_active_orderby"
											}
										>
											{item.titulo}
										</p>
										{item.botton ? (
											<button
												className={
													asc
														? "headersTable_icon "
														: "headersTable_icon icon_rotated"
												}
												onClick={() => {
													setOrderByColumnId(item.id);
													getDataFilter(orderByColumnId);
												}}
											>
												<img
													src="./Assets/Iconos/Flecha_Filtro.svg"
													alt="Flecha down"
												/>
											</button>
										) : (
											<div></div>
										)}
									</div>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody className="table__design__datatable__tbody">
					{tableOrdered?.map((item) => {
						const colorStateExcel = `${
							colorState(item.PackagesState).color_hexa
						}`;
						return (
							<tr
								key={`${(contador += 1)}${item.PackagesCurrency}`}
								data-height="15"
							>
								<td
									data-t="s"
									data-a-h="center"
									data-b-a-s="double"
									data-f-color={colorStateExcel}
									className={`${colorState(item.PackagesState).style}`}
								>
									<p className="texto__generico__tablabody">
										{colorState(item.PackagesState).name}
									</p>
								</td>
								<td
									data-t="n"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									<p className="texto__generico__tablabody">
										{item.PackagesNumber}
									</p>
								</td>
								<td
									data-t="s"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									<p className="texto__generico__tablabody">
										{item.PackagesCampaignName}
									</p>
								</td>
								<td
									data-t="s"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									<div className="contenido__logo__crito__texto">
										<img
											className="logo__currency__packages"
											src={item.CurrenciesIconUrl}
											alt=""
										/>
										<p className="texto__generico__tablabody">
											{item.PackagesCurrency}
										</p>
									</div>
								</td>
								<td
									data-t="n"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									<p className="texto__generico__tablabody">
										{item.PackagesTotalAmount}
									</p>
								</td>
								<td
									data-t="s"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									<p className="texto__generico__tablabody">
										{item.PackagesDateReceived.split("T")[0]}
									</p>
								</td>
								<td
									data-t="n"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									<p className="texto__generico__tablabody">
										{item.PackagesCycle}
									</p>
								</td>
								<td
									data-t="s"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									<p className="texto__generico__tablabody">
										{item.PackagesNextreceipt &&
											item.PackagesNextreceipt.split("T")[0]}
									</p>
								</td>
								<td
									data-t="n"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									<p className="texto__generico__tablabody">
										{item.PackagesAmountToReceive}
									</p>
								</td>
								{/* wallet */}
								<td
									data-t="s"
									data-a-h="center"
									data-b-a-s="double"
									className={`${
										item.PackagesState === "3" &&
										colorState(item.PackagesState)?.style
									}`}
								>
									{/* ESTA WALLET ES LA QUE DEBE MARCAR EL CLIENTE EN LA TABLA DE WALLETS */}
									<p className="texto__generico__tablabody">
										{item.TotalReturn}
									</p>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<div className="display">
										{colorState(item.PackagesState)?.button && (
											<Smallbutton
												classbutton={`${
													(item.PackagesState === "3" ||
														item.PackagesState === "1") &&
													colorState(item.PackagesState)?.styleButton
												}`}
												action={
													item.PackagesState === "1"
														? () => {
																functionViewQR(item);
														  }
														: item.PackagesState === "2"
														? () => {
																asignarAccionPackages(item, "cancelPackage");
														  }
														: item.PackagesState === "3"
														? () => {
																asignarAccionPackages(
																	item,
																	"reactivatePackage"
																);
														  }
														: () => {}
												}
											>
												{item.TotalReceived > 0 && item.putPackagesState === "1"
													? "Missing Funds"
													: colorState(item.PackagesState).nameButton}
											</Smallbutton>
										)}
										{item.PackagesState === "1" ? (
											<Smallbutton
												classbutton={"button_reject_packages"}
												action={() => {
													asignarAccionPackages(item, "rejectPackage");
												}}
											>
												{" "}
												REJECT{" "}
											</Smallbutton>
										) : null}
									</div>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<Smallbutton action={() => optionViewOne(item.PackagesId)}>
										VIEW
									</Smallbutton>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<Smallbutton
										action={() =>
											optionViewTwo(
												item.PackagesId,
												sessionStorage.getItem("id")
											)
										}
									>
										VIEW
									</Smallbutton>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<ModalCancelPackage
				titulo1={"CANCEL PACKAGE"}
				titulo2={""}
				open={cancelPackage}
				close={() => setCancelPackage(false)}
				backbutton={false}
				informationPackage={informationPackage}
				updateStatePackage={updateStatePackage}
			/>
			<ModalReactivatePackage
				titulo1={"PACKAGE IN CANCELLATION"}
				titulo2={""}
				open={reactivatePackage}
				close={() => setReactivatePackage(false)}
				backbutton={false}
				informationPackage={informationPackage}
				updateStatePackage={updateStatePackage}
			/>
			<ModalRejectPackage
				titulo1={"REJECT PACKAGE"}
				titulo2={""}
				open={rejectPackage}
				close={() => setRejectPackage(false)}
				backbutton={false}
				informationPackage={informationPackage}
				updateStatePackage={updateStatePackage}
			/>
			<ModalHashTransaction
				titulo1={optionsView === 1 ? "PACKAGES PURCHASE" : "PAYMENTS"}
				titulo2={"TRANSACTIONS"}
				open={openModalHash}
				close={() => setOpenModalHash(false)}
				backbutton={true}
				optionsView={optionsView}
				infoPckPurchaseTransaction={infoPckPurchaseTransaction}
				infoPaymentTransactions={infoPaymentTransactions}
			/>
		</section>
	);
};

export default DataTable;
