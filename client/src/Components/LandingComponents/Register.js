import React, { useEffect, useState } from "react";
import * as Components from "./landingComponents";
import Axios from "axios";

const Register = ({ setLoginStatus }) => {
	// Managing form Validity for registration
	const [registrationFormValidity, setRegistrationFormValidity] = useState({
		userEmailIsValid: false,
		userPasswordIsValid: false,
		formIsValid: false,
	});

	// Initial State empty for both userEmail and userPassword on registration
	const [userEmailReg, setUserEmailReg] = useState("");
	const [passwordReg, setPasswordReg] = useState("");

	const [registrationStatus, setRegistrationStatus] = useState({
		emailInvalidStatus: "",
		passwordInvalidStatus: "",
	});

	Axios.defaults.withCredentials = true;

	// change handlers
	const emailChangeHandler = async (e) => {
		await setUserEmailReg(e.target.value);
		if (!registrationFormValidity.userEmailIsValid) {
			setRegistrationStatus((prev) => {
				const emailInvalidStatus = { ...prev };
				emailInvalidStatus.emailInvalidStatus = "make sure your email is valid";
				return emailInvalidStatus;
			});
		} else if (registrationFormValidity.userEmailIsValid) {
			setRegistrationStatus((prev) => {
				const emailInvalidStatus = { ...prev };
				emailInvalidStatus.emailInvalidStatus = "";
				return emailInvalidStatus;
			});
		}
	};

	const passwordChangeHandler = (e) => {
		setPasswordReg(e.target.value);
		if (!registrationFormValidity.userPasswordIsValid) {
			setRegistrationStatus((prev) => {
				const passwordInvalidStatus = { ...prev };
				passwordInvalidStatus.passwordInvalidStatus =
					"make sure your password is longer than 6 characters";
				return passwordInvalidStatus;
			});
		} else if (registrationFormValidity.userPasswordIsValid) {
			setRegistrationStatus((prev) => {
				const passwordInvalidStatus = { ...prev };
				passwordInvalidStatus.passwordInvalidStatus = "";
				return passwordInvalidStatus;
			});
		}
	};

	// This useEffect will run only if either setRegistrationFormValidity, or userEmailReg or passwordReg changed in the last component re-render cycle
	// Omitting setRegistrationFormValidity (state updating function) from the dependencies array as its guaranteed not to change unlike userEmailReg and passwordReg
	// Note, we need to debounce the user input (we dont want to do something with every keystroke, but wait until user stopped typing to trigger)
	// with useEffect this can be achieved easily with setTimeout
	useEffect(() => {
		// regex from StackOverflow (https://stackoverflow.com/questions/7635533/validate-email-address-textbox-using-javascript)
		const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		const identifier = setTimeout(() => {
			console.log("Checking form validity!");

			if (reg.test(userEmailReg) === true) {
				setRegistrationFormValidity((prev) => {
					const emailIsValid = { ...prev };
					emailIsValid.userEmailIsValid = true;
					return emailIsValid;
				});
			} else {
				setRegistrationFormValidity((prev) => {
					const emailIsValid = { ...prev };
					emailIsValid.userEmailIsValid = false;
					emailIsValid.formIsValid = false;
					return emailIsValid;
				});
			}

			if (passwordReg.trim().length > 6) {
				setRegistrationFormValidity((prev) => {
					const passwordIsValid = { ...prev };
					passwordIsValid.userPasswordIsValid = true;
					return passwordIsValid;
				});
			} else {
				setRegistrationFormValidity((prev) => {
					const passwordIsValid = { ...prev };
					passwordIsValid.userPasswordIsValid = false;
					passwordIsValid.formIsValid = false;
					return passwordIsValid;
				});
			}

			// Setting a timer for every keystroke (500 ms) after which setFormIsValid is run
			// The trick is to save the item and with the next keystroke, we clear it (1 ongoing timer at a time, only the last one will complete)
			setRegistrationFormValidity((prev) => {
				const isValid = { ...prev };
				if (isValid.userEmailIsValid && isValid.userPasswordIsValid) {
					isValid.formIsValid = true;
				}
				return isValid;
			});
		}, 500);

		// we can return something in the useEffect, here returning an anonymous arrow function (cleanup function before useEffect executes the function for the next time)
		// This will run every time except for the first side-effect function execution
		return () => {
			console.log("CLEANUP");
			// Using the identifier to clear the previous timer with the built-in clearTimeout function
			clearTimeout(identifier);
		};
	}, [
		userEmailReg,
		passwordReg,
		registrationFormValidity.userEmailIsValid,
		registrationFormValidity.userPasswordIsValid,
		registrationFormValidity.formIsValid,
	]);

	const registerSubmitHandler = async (e) => {
		e.preventDefault();

		// this if check is redundant as the submit button will not be active unless the form is active
		if (registrationFormValidity.formIsValid) {
			await Axios.post("/api/register", {
				user_email: userEmailReg,
				password: passwordReg,
			}).then((response) => {
				setLoginStatus((prev) => {
					setUserEmailReg("");
					setPasswordReg("");
					setRegistrationStatus((prev) => {
						const currLoginStatusMessage = { ...prev };
						currLoginStatusMessage.emailInvalidStatus = "";
						currLoginStatusMessage.passwordInvalidStatus = "";
						return currLoginStatusMessage;
					});
					const currLoginStatus = { ...prev };
					currLoginStatus.status = true;
					currLoginStatus.loginResult = response.data.user_email;
					return currLoginStatus;
				});
			});
		}
	};

	return (
		<>
			<Components.Form
				className="registration"
				onSubmit={registerSubmitHandler}
			>
				<Components.Title>Create Account</Components.Title>
				<Components.Input type="text" placeholder="Name" />
				<Components.Input
					type="email"
					placeholder="Email"
					onChange={emailChangeHandler}
					value={userEmailReg}
				/>
				{!registrationFormValidity.userEmailIsValid &&
					registrationStatus.emailInvalidStatus}
				<Components.Input
					type="password"
					placeholder="Password"
					onChange={passwordChangeHandler}
					value={passwordReg}
				/>
				{!registrationFormValidity.userPasswordIsValid &&
					registrationStatus.passwordInvalidStatus}
				<Components.Button5
				className="signupbtn"
					onSubmit={registerSubmitHandler}
					disabled={registrationFormValidity.formIsValid ? false : true}
				>
					Sign Up
				</Components.Button5>
			</Components.Form>
		</>
	);
};

export default Register;
