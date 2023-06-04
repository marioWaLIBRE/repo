import React from "react";
import { useNavigate } from "react-router-dom";

import Bigbutton from "../../BigButtons/Bigbutton";
import Modal from "../Modal/Modal";

import "./modalfirstwallet.css";

const ModalFirstWallet = ({
	open,
	close,
	titulo1,
	titulo2,
	backbutton,
}) => {
	const navigate = useNavigate();
	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="grid_modal_firstwallet">
				<h1 className="title_firstwallet display">
					Register a wallet
				</h1>
				<div className="display">
					<p className="p_firstwallet">
						You must register a wallet first in order to be able{" "}
						<br />
						to buy packages and receive profits from them.
					</p>
				</div>
				<div className="display_evenly">
					<Bigbutton action={close}>Cancel</Bigbutton>
					<Bigbutton action={() => navigate("/profile")}>
						Accept
					</Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalFirstWallet;
