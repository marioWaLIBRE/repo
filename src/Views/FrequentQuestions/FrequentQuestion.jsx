import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttonback from "../../Components/ButtonBack/Buttonback";
import ExpandableList from "../../Components/ExpandibleList/ExpandableList";
import Layoutmu from "../../Components/Layouts/LayoutMU/Layoutmu";
import SupportComponent from "../../Components/SupportComponent/SupportComponent";
import { faqsTutorialsListFilteredByTypeView, useFaqsTutorialsContext } from "../../Hooks/FaqsTutorialsProvider";
import "./fq.css";

const FrequentQuestion = ({ ...props }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const faqsTutorialsList = useFaqsTutorialsContext();


	return {
		...(props.public ? (
			<div className="faqs_public_container">
				<div className="faqs_public_button">
					<div className="display_center_left">
						<Buttonback action={() => navigate("/")} />
					</div>
					<div className="display_center_center">
						<h2 className="faqs_title">FAQ's</h2>
					</div>
				</div>
				<div className="faqs_public_list display_center_center">
					<ExpandableList faqsTutorialsList={faqsTutorialsListFilteredByTypeView(faqsTutorialsList, "1")}/>
				</div>
			</div>
		) : (
			<Layoutmu loading={loading}>
				<section>
					<ExpandableList faqsTutorialsList={faqsTutorialsListFilteredByTypeView(faqsTutorialsList, "1")}/>
					<div>
						<SupportComponent />
					</div>
				</section>
			</Layoutmu>
		)),
	};
};

export default FrequentQuestion;
