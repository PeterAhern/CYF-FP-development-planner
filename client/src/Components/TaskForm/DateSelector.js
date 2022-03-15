import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateSelector.css";

const DateSelector = (props) => {
	const [dueDate, setDueDate] = useState(new Date());
	const { dueDateValue } = props;
	dueDateValue(dueDate);
	return (
		<DatePicker
			selected={dueDate}
			onChange={(date) =>setDueDate(date)
			}
			dateFormat="dd/MM/yyyy"
		/>
	);
};

export default DateSelector;
