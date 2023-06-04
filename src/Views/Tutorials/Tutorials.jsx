import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttonback from "../../Components/ButtonBack/Buttonback";
import ExpandableList from "../../Components/ExpandibleList/ExpandableList";
import Layoutmu from "../../Components/Layouts/LayoutMU/Layoutmu";
import SupportComponent from "../../Components/SupportComponent/SupportComponent";
import {
	faqsTutorialsListFilteredByTypeView,
	useFaqsTutorialsContext,
} from "../../Hooks/FaqsTutorialsProvider";
import "./tutorials.css";

const Tutorials = ({ ...props }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const faqsTutorialsList = useFaqsTutorialsContext();

	return {
		...(props.public ? (
			<div className="tutorials_public_container">
				<div className="tutorials_public_button">
					<div className="buttonBack_zIndex display_center_left">
						<Buttonback action={() => navigate("/")} />
					</div>
					<div className="display_center_center">
						<h2 className="tutorials_title">Tutorials</h2>
					</div>
				</div>
				<div className="tutorials_public_list display_center_center">
					<ExpandableList
						faqsTutorialsList={faqsTutorialsListFilteredByTypeView(
							faqsTutorialsList,
							"2"
						)}
					/>
				</div>
			</div>
		) : (
			<div>
				<Layoutmu loading={loading}>
					<section>
						<ExpandableList
							faqsTutorialsList={faqsTutorialsListFilteredByTypeView(
								faqsTutorialsList,
								"2"
							)}
						/>
						<div>
							<SupportComponent />
						</div>
					</section>
				</Layoutmu>
			</div>
		)),
	};
};

export default Tutorials;
