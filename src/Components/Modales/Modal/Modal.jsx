import ButtonBack from "../../ButtonBack/Buttonback";

import "./Modal.css";

const Modal = ({
	children,
	open,
	close,
	titulo1,
	titulo2,
	backbutton,
	loading,
}) => {
	return (
		<div className={`dad__container__modal ${open && "open_modal"}`}>
			<div className="container__modal">
				{backbutton ? (
					<ButtonBack action={close}></ButtonBack>
				) : (
					<div></div>
				)}
				<div className="confi__titulo_modal">
					<h1 className="titulo1__modal">{titulo1}</h1>
					<h1 className="titulo2__modal">{titulo2}</h1>
				</div>
				<div></div>
				{loading ?
					<div className="contenido__modal__interior loading">
						<img
							src="Assets/Animaciones/Cargando/Loading.gif"
							alt=""
							className="gif__precarga"
						/>
					</div>
					:
					<div className="contenido__modal__interior">{children}</div>
				}
			</div>
		</div>
	);
};

export default Modal;
