import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Bigbutton from "../../Components/BigButtons/Bigbutton";
import Buttonback from "../../Components/ButtonBack/Buttonback";
import Input from "../../Components/Input/Input";
import SelectCategory from "../../Components/SelectCategory/SelectCategory";
import { schema } from "./SchemaFormSupport";
import "./support.css";

const Support = () => {
	const navigate = useNavigate();
	const [fileSupportListLength, setFileSupportListLength] = useState(0);
	const [bodyList, setbodyList] = useState([]);

	// FUNCION PARA EL CONSUMO Y ENVIO DEL FORMULARIO
	// const clearFilters = () => {
	// 	setFilterStateSupport("0");
	// };

	const onSubmitSupport = (data) => {
		// registerUser(data);
		// clearFilters();
	};

	const handleFile = (e) => {
		setFileSupportListLength(e.target.files.length);
		let body = [];
		body.push(...e.target.files);
		setbodyList(body);
	};

	// FORMULARIO PARA EL SOPORTE
	const {
		register,
		handleSubmit,
		formState: { errors },
		// setValue,
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onBlur",
		defaultValues: {
			FullName: "",
			Email: "",
			Subject: "",
			Category: "",
			Contents: "",
			Append: [],
		},
	});

	return (
		<section className="support_view_container">
			<div className="support_view_button">
				<Buttonback action={() => navigate(-1)} />
			</div>
			<div className="support_view_form_container">
				<form
					className="support_view_form_inputs_container"
					encType="multipart/form-data"
				>
					<div className="divs_support_view_input_select">
						<label> Category: </label>
						<SelectCategory
						// className={"selectState_filterPackages"}
						// onChange={(event) => setFilterStateSupport(event)}
						// value={filterStateSupport}
						/>
					</div>
					<div className="divs_support_view_input">
						<Input
							label={"Email"}
							type={"text"}
							placehoder={"Enter your email..."}
							forid={"emailSupport"}
							{...register("emailSupport")}
							error={errors.emailSupport && errors.emailSupport.message}
						></Input>
					</div>
					<div className="divs_support_view_input">
						<Input
							label={"Subject"}
							type={"text"}
							placehoder={""}
							forid={"subjectSupport"}
							{...register("subjectSupport")}
							error={errors.subjectSupport && errors.subjectSupport.message}
						></Input>
					</div>
					<div className="divs_support_view_input_description">
						<label htmlFor="textArea_description">Description</label>
						<textarea
							className="support_input_description"
							name="mensaje"
							id="mensaje"
							// rows="3"
							{...register("descriptionSupport")}
						></textarea>
					</div>
					<label className="divs_support_view_append_label" htmlFor="append">
						Choose your files
					</label>
					<div className="divs_support_view_append">
						<input
							className="imgdivs_support_view_append_input"
							type="file"
							name="append"
							id="append"
							accept=".png,.jpg,.JPG,.jpeg,.svg"
							multiple
							onChange={handleFile}
							// onChange={(e) => imageBase64(e.target.files[0])}
						/>
					</div>
					<div className="divs_support_view_input_alert">
						{bodyList?.map((item) => {
							return (
								<ul key={item.name}>
									<li>{item.name}</li>
								</ul>
							);
						})}
						<span className="divs_support_view_input_alert_red">
							You have{" "}
							{/* {" "}
							{fileSupportList.length} */}
							{fileSupportListLength} attachments.
						</span>
					</div>
				</form>
			</div>
			{/* {isValid && ( */}
			<div className="support_view_button_container">
				<Bigbutton action={handleSubmit(onSubmitSupport)}>SUBMIT</Bigbutton>
			</div>
			{/* )} */}
		</section>
	);
};

export default Support;
