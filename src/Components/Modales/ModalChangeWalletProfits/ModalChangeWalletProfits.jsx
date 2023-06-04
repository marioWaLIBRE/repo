import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Bigbutton from "../../BigButtons/Bigbutton";
import Modal from "../Modal/Modal";
import { schema } from "../ModalChangeWalletReferral/SchemaForUpdatePaymentCommisions";

import "./modalchangewalletprofits.css";

const ModalChangeWalletProfits = ({
	open,
	close,
	titulo1,
	titulo2,
	information,
	backbutton,
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
	//Function to update wallet
	const putApiUpdateWallet = props.putApiUpdateWallet;
	const [walletId, setWalletId] = useState(props.walletId);

	const closeAndClearValuesModal = () => {
		setValue("token", "")
		close();
	}

	const updateWalletForPaymentsProfits= (data) => {
		putApiUpdateWallet({
			UsersCliWalletsId: walletId,
			walletForReceipt: true,
			token: data.token,
		})
	}

	useEffect(() => {
		setWalletId(information.UsersCliWalletsId);
	}, [open]);
	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="grid_modal_changewalletprofits">
				<h1 className="title_changewalletprofits display">
					New wallet to receive my profits
				</h1>
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
					<p className="p_changewalletprofits">
						If you click “Accept”, this would be the selected wallet
						to receive the payment for the profit from your purchased
						packages
					</p>
				</div>
				<div className="display_evenly">
					<Bigbutton disabled action={closeAndClearValuesModal}>
						Cancel
					</Bigbutton>
					<Bigbutton
						action={handleSubmit(updateWalletForPaymentsProfits)}
					>
						{" "}
						Accept{" "}
					</Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalChangeWalletProfits;
