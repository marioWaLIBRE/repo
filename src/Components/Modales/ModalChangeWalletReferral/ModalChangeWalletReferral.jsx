import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Bigbutton from "../../BigButtons/Bigbutton";
import Input from "../../Input/Input";
import Modal from "../Modal/Modal";

import "./modalchangewalletreferral.css";
import { schema } from "./SchemaForUpdatePaymentCommisions";

const ModalChangeWalletReferral = ({
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

	const updateWalletForPaymentsReferral = (data) => {
		putApiUpdateWallet({
			UsersCliWalletsId: walletId,
			walletForReferrals: true,
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
			<div className="grid_modal_changewalletreferral">
				<h1 className="title_changewalletreferral display">
					{" "}
					New wallet for referral payments{" "}
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
					<p className="p_changewalletreferral">
						{" "}
						If you press accept, this will be the wallet where you
						will receive the monthly payment for the benefits of your
						referrals.{" "}
					</p>
				</div>
				<div className="display_evenly">
					<Bigbutton disabled action={closeAndClearValuesModal}>
						{" "}
						Cancel{" "}
					</Bigbutton>
					<Bigbutton
						action={handleSubmit(updateWalletForPaymentsReferral)}
					>
						{" "}
						Accept{" "}
					</Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalChangeWalletReferral;
