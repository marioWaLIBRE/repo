import React from "react";
import Bigbutton from "../../BigButtons/Bigbutton";
import Modal from "../Modal/Modal";
import "./modalreactivate.css";

const ModalReactivate = ({
	titulo1,
	titulo2,
	open,
	close,
	backbutton,
}) => {
	return (
		<Modal
			titulo1={titulo1}
			titulo2={titulo2}
			open={open}
			close={close}
			backbutton={backbutton}
		>
			<div className="grid__modal__reactivate">
				<div className="atributos__comunes__modal__reactivate">
					<p className="texto__pripar__modal__reactivate ">
						Press accept to reactivate
					</p>
				</div>
				<div className="atributos__comunes__modal__reactivate">
					<p className="texto__secpar__modal__reactivate">
						Reactivate this package(s) to start receiving benefits
						from your purchase again
					</p>
				</div>
				<div className="thirdpar__modal__reactivate atributos__comunes__modal__reactivate">
					<Bigbutton action={close}>Cancel</Bigbutton>
					<Bigbutton>Accept</Bigbutton>
				</div>
			</div>
		</Modal>
	);
};

export default ModalReactivate;
