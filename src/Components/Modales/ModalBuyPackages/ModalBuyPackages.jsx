import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	getSelectCurreny,
	getWalletToPay,
	postNewPackage,
} from "../../../Services/Packages.api";
import { decodeBase64 } from "../../../Share/functions";

import Bigbutton from "../../BigButtons/Bigbutton";
import Selects from "../../Select/Select";
import Modal from "../Modal/Modal";

import "./modalbuypackages.css";

const ModalBuyPackages = ({
	open,
	close,
	titulo1,
	titulo2,
	backbutton,
	openPayment,
	setSelectCurrencyFromPackages,
	getPackage,
	setTotalToPay,
	setTotalReceived,
	setOpenModalAlerts,
	selectWallet,
	setSelectWallet,
	campaigns,
	campaignType,
	// setLoading,
	// loading,
}) => {
	/**
	 *
	 * useState para guardar la currency seleccionada en el select
	 */
	const [selectCurrency, setSelectCurrency] = useState();
	const [campaignValue, setCampaignValue] = useState(" ");
	/**
	 *
	 * useState para guardar la package to pay seleccionada en el select
	 */
	const [selectWalletChild, setSelectWalletChild] = useState(selectWallet);

	// const [loadingFromPackages, setloadingFromPackages] =
	// 	useState(loading);
	const [loadingBuyPackages, setLoadingBuyPackages] = useState(false);
	const [campaignsChild, setCampaignsChild] = useState(campaigns);
	const [campaignTypeChild, setCampaignTypeChild] = useState(campaignType);

	// const totalAmountToPay = {550 * watch("packagesNumber")};

	// const setSelectCurrencyFromPackages = props.setSelectCurrency;

	useEffect(() => {
		if (setSelectCurrencyFromPackages && selectCurrency !== null) {
			setSelectCurrencyFromPackages(selectCurrency?.value);
		}
	}, [selectCurrency]);

	useEffect(() => {
		setSelectWalletChild(selectWallet);
	}, [selectWallet]);

	useEffect(() => {
		setCampaignsChild(campaigns);
		setCampaignTypeChild(campaignType);
	}, [campaigns]);

	const changeSelectedCurrencyAndUpdateFilteredWallets = (selectedValue) => {
		setSelectCurrency(selectedValue);
		let packagesTemp = [];
		setSelectWallet(null); //o " "
		packagesInfo.forEach((item) => {
			if (item.UsersCliWalletsCurrencyId === selectedValue.value) {
				packagesTemp.push({
					value: item.UsersCliWalletsAddress,
					label: item.UsersCliWalletsName,
				});
			}
		});
		setFilteredWallets(packagesTemp);
	};

	/**
	 *
	 * useState guarda la informacion que me envia el API para mostrar en el select crypto currency.
	 */
	const [currencies, setCurrencies] = useState([]);
	/**
	 *
	 * useState guarda la informacion que me envia el API para mostrar en el select package to pay.
	 */
	// const [package, setWallet] = useState([]);

	/**
	 *
	 * Se crea un use state para la información completa de las packages, y así poder filtrar las de una determinada currency
	 * Se crea un nuevo use state de las packages filtradas por la currency seleccionada
	 */
	const [packagesInfo, setWalletsInfo] = useState([]);
	const [filteredWallet, setFilteredWallets] = useState([]);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isValid },
	} = useForm({
		modo: "onBlur",
		defaultValues: {
			packagesNumber: 1,
		},
	});

	/**
	 *
	 * Se crea la funcion get para recibir la respuesta dentro de las promesas que se utilizaran dentro del getSelectCurrency.
	 */

	const getApiSelectCurrency = () => {
		getSelectCurreny()
			.then((response) => {
				let body = [];
				response.data?.map((item) => {
					body.push({
						value: item.CurrenciesId,
						label: (
							<div className="display_left">
								<img
									className="currencies__modal__buypack"
									src={item.CurrenciesIconUrl}
									alt=""
								/>
								<p className="currencies__modal__texto">
									{item.CurrenciesName}
								</p>
							</div>
						),
					});
				});
				// Pasarle el body a mi useState
				setCurrencies(body);
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
	 * Se crea la funcion get para recibir la respuesta dentro de las promesas que se utilizaran dentro del getWalletToPay.
	 */
	const getApiWalletToPay = () => {
		getWalletToPay()
			.then((response) => {
				setWalletsInfo(response.data);
			})
			.catch((e) => {
				console.log(e);
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};
	/**
	 * @
	 * Creo la funcion para realizar la creacion de la nueva package a partir del postNewPackage
	 */
	const clearValuesModal = () => {
		setSelectCurrency(null);
		setSelectWallet(null);
		setValue("packagesNumber", "1");
	};

	const closeClear = () => {
		clearValuesModal();
		close();
	};

	const createPackage = (data) => {
		if (
			!Number.isInteger(parseFloat(data.packagesNumber)) ||
			data.packagesNumber < 1
		) {
			alert("Number of packages must be whole and positive");
			return;
		}
		let emailCodification = decodeBase64(sessionStorage.getItem("id"));
		let body = {
			...data,
			email: emailCodification,
			plansId: 1,
			//Debe ser .label para que traiga el valor correcto
			packagesWalletAddress: selectWalletChild?.value,
			packagesCurrencyId: selectCurrency?.value,
			packagesNumber: data.packagesNumber,
			campaignsId: campaignValue,
		};
		if (
			isValid &&
			selectWalletChild &&
			selectCurrency &&
			campaignValue !== " "
			// data.packagesNumber
		) {
			setLoadingBuyPackages(true);
			postNewPackage(body)
				.then((response) => {
					let message = response.data.message;
					setTotalToPay(550 * data.packagesNumber);
					setTotalReceived(data.TotalReceived ?? 0);
					alert(message);
					clearValuesModal();
					close();
					openPayment();
					getPackage();
				})
				.catch((e) => {
					if (e.response?.data.message) {
						alert(e.response?.data.message);
					}
				})
				.finally(() => {
					setLoadingBuyPackages(false);
				});
		} else {
			if (!selectCurrency || !selectWalletChild || campaignValue === " ") {
				alert("Please complete all the files in order to buy a package");
			}
		}
	};

	/**
	 * 
	 * useEffect se encarga de activar las funciones al momento que se ingresa a la vista. Realiza la precarga de la info a partir del consumo de la API.
	 * useEffect(() => {
		
	}, []); lo de las [] hace que se actualice la informacion, son variables del useState. Llave vacias hace que se ejecute solo una vez.
	 */
	// Agregar las funciones al useEffect para actualizar la informacion.
	useEffect(() => {
		getApiSelectCurrency();
		getApiWalletToPay();
	}, []);

	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="grid_modal_buypackages">
				<div className="alert_text_modal_buypackages_container">
					<p>
						<span className="alert_text_modal_buypackages">Warning: </span>
						Confirm your sending wallet or your crypto could be lost
					</p>
				</div>
				<div className="currencypackage_container">
					<div className="campaign_container">
						<label className="label__newpackage" htmlFor="campaigns">
							Choose a media type Campaign:
						</label>
						<br />
						<select
							className="campaings_select"
							name="campaigns"
							id="campaigns"
							onChange={(e) => setCampaignValue(e.target.value)}
							value={campaignValue}
						>
							<option
								className="campaign_select_option_light"
								disabled
								value=" "
							>
								... select a campaign
							</option>
							{campaignTypeChild?.map((itemCampaignTypeMap) => {
								return (
									<optgroup
										key={itemCampaignTypeMap}
										label={itemCampaignTypeMap}
									>
										{campaignsChild
											.filter((itemCampaignsChild) => {
												return (
													itemCampaignsChild.CampaignsType ===
													itemCampaignTypeMap
												);
											})
											.map((itemCampaign) => {
												return (
													<option
														key={itemCampaign.CampaignsId}
														className="campaign_select_option"
														value={itemCampaign.CampaignsId}
													>
														{" "}
														{itemCampaign.CampaignsName}
													</option>
												);
											})}
									</optgroup>
								);
							})}
						</select>
					</div>
					<div className="newpackage_container display display_column">
						<div className="padding_containers">
							<label className="label__newpackage" htmlFor="">
								Select crypto currency
							</label>
						</div>
						<div className="padding_containers">
							<Selects
								options={currencies}
								onChange={(event) =>
									changeSelectedCurrencyAndUpdateFilteredWallets(event)
								}
								value={selectCurrency}
							/>
						</div>
					</div>

					<div className="newpackage_container display display_column">
						<div className="padding_containers">
							<label className="label__newpackage" htmlFor="">
								Enter qty of packages to purchase
							</label>
						</div>
						<input
							className="input__newpackage"
							type="number"
							min="1"
							pattern="\d*"
							placeholder=""
							// defaultValue={amount.toString()}
							defaultValue="1"
							id="packages_amount_id"
							// onChange={handleAmountChange}
							{...register("packagesNumber")}
						/>
					</div>
				</div>
				<div className="currencypackage_container">
					<div className="newpackage_container display display_column">
						<div className="padding_containers">
							<label className="label__newpackage" htmlFor="">
								Wallet you will use to purchase
							</label>
						</div>
						<div className="padding_containers">
							<Selects
								options={filteredWallet}
								onChange={(event) => {
									setOpenModalAlerts(true);
									setSelectWallet(event);
								}}
								value={selectWalletChild}
							/>
						</div>
					</div>
					<div className="wallet_token_container display_column">
						<div className="attributes_in_common_edit_wallet">
							<label className="label_token_editwallet" htmlFor="">
								<b>Paste your 2FA Authentication</b>
							</label>
						</div>
						<div className="attributes_in_common_edit_wallet">
							<input
								className="input_token_editwallet"
								type="text"
								placeholder=""
								maxLength="6"
								minLength="6"
								id="input_address_wallet"
								name="tokenAddress"
								{...register("token")}
							/>
							<p className="input_token_error">
								{errors.token && errors.token.message}
							</p>
						</div>
					</div>
					<div className="newpackage_container display display_column">
						<div className="padding_containers">
							<label
								className="label__newpackage label__newpackage_light"
								htmlFor=""
							>
								Amount in Crypto to Send
							</label>
						</div>
						<p className="input__newpackage_amount">
							{550 * watch("packagesNumber")}
						</p>
					</div>
				</div>
				<div className="button_modal_buy_packages_container">
					<Bigbutton action={closeClear}> Cancel </Bigbutton>
					{!loadingBuyPackages ? (
						<Bigbutton
							action={loadingBuyPackages ? null : handleSubmit(createPackage)}
						>
							Accept
						</Bigbutton>
					) : (
						<div className="display"> Loading...</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default ModalBuyPackages;
