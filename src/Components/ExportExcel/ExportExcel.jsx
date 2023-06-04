import React from "react";
import "./exportexcel.css";

const ExportExcel = ({ children, action }) => {
	return (
		<div className="filter_xls-export display_right">
			<p className="text_export-green" onClick={action}>
				{children}
			</p>
		</div>
	);
};

export default ExportExcel;
