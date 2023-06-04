import React from "react";

import Bigbutton from "../../BigButtons/Bigbutton";
import Input from "../../Input/Input";
import Modal from "../Modal/Modal";

import "./modalcantdelete.css";

const ModalCantDelete = ({
	open,
	close,
	titulo1,
	titulo2,
	information,
}) => {
	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
		>
			<div className="grid_modal_cantdelete">
				<div className="currency-container">
					<p className="namecurrency_modal_cantdelete"> Currency </p>
					<p className="nicknamewallet_modal_cantdelete">
						{" "}
						My Wallet{" "}
					</p>
				</div>
				<div className="display">
					<div className="date_modal_cantdelete display">
						<img
							className="logo__currency__cantdelete"
							src={information.CurrenciesIconUrl}
							alt=""
						/>
						<p className="address_modal_cantdelete">
							{information.UsersCliWalletsAddress}
						</p>
					</div>
				</div>
				<div className="display">
					<p className="p_modal_cantdelete">
						{" "}
						You are using this wallet to receive payments, change the
						use of <br /> this wallet in the settings then you may
						delete it.{" "}
					</p>
				</div>
				<div className="display">
					<Bigbutton disabled action={close}>
						{" "}
						Accept{" "}
					</Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalCantDelete;
