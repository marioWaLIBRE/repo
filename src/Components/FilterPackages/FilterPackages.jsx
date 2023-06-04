import React from "react";
import TableToExcel from "@linways/table-to-excel";
import SelectState from "../SelectState/SelectState";
import "./filterpackages.css";
import DatePicker from "../DatePicker/DatePicker";
import ExportExcel from "../ExportExcel/ExportExcel";

const FilterPackages = ({
	filterInitialDate,
	filterFinalDate,
	setFilterInitialDate,
	setFilterFinalDate,
	clearFilters,
	deleteAllPackagesRejected,
}) => {
	/**
	 *
	 *Función para generar convertir la tabla a excel y generarlo
	 */
	const generateExcel = () => {
		TableToExcel.convert(document.getElementById("dateTable_PackagesUser"), {
			name: "Current Packages.xlsx",
			sheet: {
				name: "Page 1",
			},
		});
	};

	return (
		<section className="filter_packages-container">
			<div className="margin_top_columns filter_datepicker">
				<DatePicker
					filterInitialDate={filterInitialDate}
					filterFinalDate={filterFinalDate}
					setFilterInitialDate={setFilterInitialDate}
					setFilterFinalDate={setFilterFinalDate}
				/>
			</div>
			<div className="clear_button_filters_container">
				<button
					className="clear_button_filters"
					onClick={() => {
						clearFilters();
					}}
				>
					Clear Filters
				</button>
				<button
					className="clear_button_filters"
					onClick={() => {
						deleteAllPackagesRejected();
					}}
				>
					Clear All Rejected
				</button>
			</div>
			<ExportExcel children={"GET XLS DOCUMENT"} action={generateExcel} />
		</section>
	);
};

export default FilterPackages;
