import React from "react";
import { useForm } from "react-hook-form";
import Bigbutton from "../../BigButtons/Bigbutton";
import Modal from "../Modal/Modal";
import "./modalpackcan.css";

const ModalCancelPackage = ({
	titulo1,
	titulo2,
	open,
	close,
	backbutton,
	informationPackage,
	...props
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
	const updateStatePackage = props.updateStatePackage;

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
						Are you sure, you want to cancel your packages?
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
				<div className="atributos__comunes__modal__packcancel">
					<p className="texto__secpar__modal__packcancel">
						These packages will enter a cancellation period during
						which you will be able to reactivate them until a day
						before the next payment date. In the next payment date you
						will receive the total amount for the packages plus the
						profits for this period, then the packages will be
						cancelled and you will no longer receive profits.
					</p>
				</div>
				<div className="thirdpar__modal__packcancel atributos__comunes__modal__packcancel">
					<Bigbutton action={closeAndClearModalCancelPackages}>Cancel</Bigbutton>
					<Bigbutton action={handleSubmit(updateStatePackageAndClose)}>
						Accept
					</Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalCancelPackage;
