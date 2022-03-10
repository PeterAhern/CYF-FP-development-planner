import { useState } from "react";

const useInput = (validateValue) => {
	// here I want to manage the value of a given input, the touched state, I want to infer its validity, combined with the touchedState
	// this hook should be flexible => the complete validation logic will be passed to the hook from outside

	const [enteredValue, setEnteredValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = (event) => {
		// if the input loses focus, then the input was definitely touched
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue("");
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
