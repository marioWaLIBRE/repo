import React, { useEffect, useState } from "react";
import "./expandablelist.css";

const ExpandableList = ({ faqsTutorialsList }) => {
	const [finalArray, setFinalArray] = useState([faqsTutorialsList]);

	useEffect(() => {
		setFinalArray(faqsTutorialsList);
	}, [faqsTutorialsList]);

	const toggle = (counter) => {
		document
			.querySelectorAll(".expandable-item")
			[counter].classList.toggle("active");
	};

	return (
		<section className="expandible_list_container display_column_center_up ">
			<div className="margin_top_expandable">
				{finalArray?.map((item, index) => {
					return (
						<div
							className="expandable_list "
							key={`${item.FAQSID}${item.FAQSQuestion}`}
						>
							<div
								className={
									item.isOpenByDefault
										? "expandable-item active"
										: "expandable-item"
								}
							>
								<div
									className="expandable-header"
									onClick={() => toggle(index)}
								>
									{item.FAQSQuestion}
									<div className="expandable-icon">
										<div className="line"></div>
										<div className="line"></div>
									</div>
								</div>
								<div className="expandable-body">
									{item.FAQSURL ? (
										<div className="iframe_container display">
											<video
												width="80%"
												height="500"
												frameBorder="0"
												src={item.FAQSURL}
												type="video/mp4"
												controls
												allowFullScreen
											></video>
										</div>
									) : (
										<p>{item.FAQSAnswer}</p>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default ExpandableList;
