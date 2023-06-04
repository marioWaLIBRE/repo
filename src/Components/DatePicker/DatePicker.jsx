import React, { useState } from "react";
import { DateRangePicker, isInclusivelyBeforeDay } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./datepicker.css";
import moment from "moment";

import "react-dates/initialize"; // PROHIBIDO BORRAR

function DatePicker({
	filterInitialDate,
	filterFinalDate,
	setFilterInitialDate,
	setFilterFinalDate,
	...props
}) {
	const [focusedInput, setFocusedInput] = useState(null);
	const handleDatesChange = ({ startDate, endDate }) => {
		setFilterInitialDate(startDate);
		setFilterFinalDate(endDate);
	};

	return (
		<div className="daterange_picker_style_container display_left">
			<DateRangePicker
				daySize={25}
				orientation={"vertical"}
				startDate={filterInitialDate}
				startDateId="tata-start-date"
				endDate={filterFinalDate}
				endDateId="tata-end-date"
				// Función para que me tome como posibles opciones de fecha inical desde el día de hoy menos 1000 meses antes
				// isOutsideRange={(day) =>
				// 	isInclusivelyBeforeDay(day, moment().subtract(100, "month"))
				// }
				//Función que permite filtrar por fechas hasta el momento actual
				isOutsideRange={(day) => !isInclusivelyBeforeDay(day, moment())}
				onDatesChange={handleDatesChange}
				focusedInput={focusedInput}
				onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
			/>
		</div>
	);
}

export default DatePicker;
