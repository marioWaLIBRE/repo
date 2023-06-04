import React from "react";
import { useForm } from "react-hook-form";
import Bigbutton from "../../BigButtons/Bigbutton";
import Modal from "../Modal/Modal";

const ModalRejectPackage = ({
	titulo1,
	titulo2,
	open,
	close,
	backbutton,
	informationPackage,
	updateStatePackage,
}) => {

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		modo: "onBlur",
		defaultValues: {
			token: ""
		},
	});

	const updateStatePackageAndClose = (data) => {
		updateStatePackage(informationPackage.PackagesId, false, data.token);
	};

	const closeAndClearModalCancelPackages = () => {
		setValue("token", "")
		close();
	}

	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="grid__modal__packcancel">
				<div className="atributos__comunes__modal__packcancel">
					<p className="texto__pripar__modal__packcancel ">
						Are you sure, you want to reject your packages?
					</p>
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
				<div className="thirdpar__modal__packcancel atributos__comunes__modal__packcancel">
					<Bigbutton action={closeAndClearModalCancelPackages}>Cancel</Bigbutton>
					<Bigbutton action={handleSubmit(updateStatePackageAndClose)}>Accept</Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalRejectPackage;
