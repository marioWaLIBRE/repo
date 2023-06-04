import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { deleteWalletApi } from "../../../Services/Wallets.api";

import Bigbutton from "../../BigButtons/Bigbutton";
import Modal from "../Modal/Modal";

import "./modaldeletewallet.css";
import { schema } from "./SchemaForDeleteWallet";

const ModalDeleteWallet = ({
	open,
	close,
	titulo1,
	titulo2,
	backbutton,
	information,
	...props
}) => {

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		mode: "all",
		//La validación por defecto, solo se dispara cuando hay un cambio en un input; y usar la función setValue no dispara la validación por lo cual, se pone reValidateMode para que vuelva a validar cuando se hace un submit del formulario.
		// reValidateMode: "onSubmit",
	});

	const getWalletByUser = props.getWalletByUser;

	const deleteApiWallet = (data) => {
		let walletId = information.UsersCliWalletsId;
		deleteWalletApi(data, walletId)
			.then((response) => {
				if (response.status === 200) {
					alert(response.data.message);
					getWalletByUser();
					if (response.status === 200) {
						close();
						setValue("token", "");
					}
				}
			})
			.catch((e) => {
				// alert("User was not updated");
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	const clearValuesModalDeleteWallet = () => {
		setValue("token", "");
		close();
	};

	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="grid_modal_deletewallet">
				<div className="currency_deletewallet_container">
					<p className="namecurrency_modal_deletewallet">Currency</p>
					<p className="nicknamewallet_modal_deletewallet">
						{information.UsersCliWalletsCurrencyId}
					</p>
				</div>
				<div className="display">
					<div className="date_modal_deletewallet display_evenly">
						<div className="ordenard__evenly1">
							<img
								className="imagen_modal_deletewallet"
								src={information.CurrenciesIconUrl}
								alt=""
							/>
						</div>
						<div className="ordenard__evenly2">
							<p className="address_modal_deletewallet">
								{information.UsersCliWalletsAddress}
							</p>
						</div>
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
				<div className="display">
					<p className="p_modal_deletewallet">
						THE WALLET WILL BE DELETED
					</p>
				</div>
				<div className="buttons_container_deleteWallets display_evenly">
					<Bigbutton action={clearValuesModalDeleteWallet}>Cancel</Bigbutton>
					<Bigbutton action={handleSubmit(deleteApiWallet)}> Accept </Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalDeleteWallet;
