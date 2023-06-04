import Layoutmu from "../../../Components/Layouts/LayoutMU/Layoutmu";
import Input from "../../../Components/Input/Input";
import "./profileEdi.css";
import Smallbutton from "../../../Components/SmallButtons/Smallbutton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./SchemaFormEditPro";
import { useEffect, useState } from "react";
import {
	getProfileApi,
	updatedProfileApi,
} from "../../../Services/Profile.api";
import SupportComponent from "../../../Components/SupportComponent/SupportComponent";

const ProfileEdi = () => {
	/**
	 *
	 * loading: Es para activar o desativar el loadign por medio de un boolean
	 * img: Obtener la imagen que seleciona en el input file
	 */
	const [loading, setLoading] = useState(false);
	const [img, setimg] = useState("");
	const navigate = useNavigate();

	/**
	 *
	 * Función para actaulizar los datos del usuario
	 * @param {Array} data Es un dato tipo array su base es defaultValues de useForm
	 */
	const updatedProfile = (data) => {
		//Activar loagding
		setLoading(true);
		if (img.indexOf("https://") === -1) {
			data.profilePicture = img;
		} else {
			delete data.profilePicture;
		}
		updatedProfileApi(data)
			.then((res) => {
				alert(res.data.message);
				getProfile();
				navigate("/profile");
			})
			.catch((e) => {
				//Descativar loading
				setLoading(false);
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			})
			.finally(() => {
				//Descativar loading
				setLoading(false);
			});
	};

	/**
	 *  -
	 * ?Se utiliza userForm para facilidad de validación de formulario con yup,
	 * ?los (defaultValues) son los name de los input para obtener o agregar datos al formulario
	 */
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onBlur",
		defaultValues: {
			firstName: "",
			lastName: "",
			userName: "",
			profilePicture: null,
			token: "",
		},
	});

	/**
	 *
	 * ?Esta función permite obtener el data de imagen
	 * ?y convertirla en base64 FileReader es uan libreria
	 * ?de JavaScript y readAsDataURL lo compierte en base64
	 * ?por medio de la función reader.onload se obtiene el
	 * ?result que es la imagen en base64
	 * !Creo que se prodia colocar en el carpeta shared
	 * !pero toca mirar si la utlizan ene otra parte
	 * @param {*} event Detecta los eventos que contiene el input
	 */
	const imageBase64 = (event) => {
		let reader = new FileReader();
		reader.readAsDataURL(event);
		reader.onload = () => {
			setimg(reader.result);
		};
	};

	/**
	 *
	 * La función permite obtener los datos del usuario, se agrega a setValu que es un estado que maneja
	 * useForm para actualizar el value de los formularios.
	 */
	const getProfile = () => {
		//Activar loagding
		setLoading(true);
		getProfileApi()
			.then((res) => {
				setValue("firstName", res.data[0].UsersCliFirstName);
				setValue("lastName", res.data[0].UsersCliLastName);
				setValue("userName", res.data[0].UsersCliUserName);
				setValue("profilePicture", res.data[0].UsersCliProfilePicture);
				//Se agrega un randomico a la url de la imgene para que no tome el cache y se pueda actaulizar
				setimg(
					res.data[0].UsersCliProfilePicture &&
						res.data[0].UsersCliProfilePicture.length > 0
						? res.data[0].UsersCliProfilePicture +
								"?" +
								(Math.random() + 1).toString(36).substring(7)
						: ""
				);
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
				//Descativar loading
				setLoading(false);
			})
			.finally(() => {
				//Descativar loading
				setLoading(false);
			});
	};

	/**
	 *
	 * useEffect se utiliza como disparador, por ejemplo cuando
	 * ingrese a la vista ProfielEdit corra la función getProfile
	 * para ver los datos en el formulario.
	 */
	useEffect(() => {
		getProfile();
	}, []);

	const callBrowser = () => {
		<label htmlFor="browser"></label>;
	};

	return (
		<Layoutmu loading={loading}>
			<div className="container__grid__editinfoprofile">
				<div className="cotainer__img__profile atributos__comunes__profile__edit1">
					<label htmlFor="browser" className="click__imagen">
						<div className="circulo__edit__profile__profile">
							{img && img.length > 0 ? (
								<img
									src={img}
									alt=""
									className="img__edit__profile__profile"
									onClick={callBrowser()}
								/>
							) : (
								<img
									src="./Assets/Iconos/Avatar.svg"
									alt=""
									className="img__edit__profile__profile"
									onClick={callBrowser()}
								/>
							)}
						</div>
					</label>
					<label htmlFor="browser" className="texto__edit__img__profile">
						Change image
					</label>
					<input
						type="file"
						id="browser"
						accept=".png,.jpg,.JPG,.jpeg,.svg"
						onChange={(e) => imageBase64(e.target.files[0])}
					/>
				</div>
				{/* INFO DEL PERFIL */}
				<div className="atributos__comunes__profile__edit2">
					<form className="form_userprofile_container">
						<div className="form_fullNameUser_container">
							<div className="form_fullNameUser_space">
								<Input
									label={"First Name"}
									type={"text"}
									placehoder={""}
									forid={"firstname"}
									{...register("firstName")}
									error={errors.firstname && errors.firstname.message}
								></Input>
							</div>
							<div className="form_fullNameUser_space">
								<Input
									label={"Last Name"}
									type={"text"}
									placehoder={""}
									forid={"lastname"}
									{...register("lastName")}
									error={errors.lastname && errors.lastname.message}
								></Input>
							</div>
						</div>
						<div className="form_passwordAndToken_container">
							<div className="form_fullNameUser_space">
								<Input
									label={"Username"}
									type={"text"}
									placehoder={""}
									forid={"username"}
									{...register("userName")}
									error={errors.username && errors.username.message}
								></Input>
							</div>
							<div className="dad__label__container form_fullNameUser_space">
								<div className="label__container">
									<label className="edit__label__label" htmlFor="">
										<b> Paste your 2FA Authentication</b>
									</label>
								</div>
								<div>
									<input
										className="edit__input__label"
										type="text"
										placeholder=""
										maxLength="6"
										minLength="6"
										id="token"
										{...register("token")}
									/>
									<p className="input_token_error">
										{errors.token && errors.token.message}
									</p>
								</div>
							</div>
						</div>
						<div className="buttons_edit_profile">
							<div className="buttons_edit_profile_interior">
								<Smallbutton action={() => navigate("/profile")}>
									Cancel
								</Smallbutton>
							</div>
							<div className="buttons_edit_profile_interior">
								<Smallbutton action={handleSubmit(updatedProfile)}>
									OK
								</Smallbutton>
							</div>
							<br />
						</div>
					</form>
				</div>
				<div>
					<SupportComponent />
				</div>
			</div>
		</Layoutmu>
	);
};
export default ProfileEdi;
