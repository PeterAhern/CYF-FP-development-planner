import React, { useEffect, useState } from "react";

import Axios from "axios";

const Login = ({ setLoginStatus }) => {
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

			// password validation needs to change > 6 not > 3, for testing
			if (passwordReg.trim().length > 3) {
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

	const loginSubmitHandler = async (e) => {
		e.preventDefault();

		// this if check is redundant as the submit button will not be active unless the form is active
		if (registrationFormValidity.formIsValid) {

			return Axios.post("/api/login", {
				user_email: userEmailReg,
				password: passwordReg,
			}).then((response) => {
				console.log(response);
				if (response.data.message) {
					setLoginStatus((prev) => {
						const currLoginStatus = { ...prev };
						currLoginStatus.status = false;
						currLoginStatus.loginResult = response.data.message;
						return currLoginStatus;
					});
				} else {
					setLoginStatus((prev) => {
						setUserEmailReg("");
						setPasswordReg("");
						setRegistrationStatus((prev) => {
							const currLoginStatusMessage = { ...prev };
							currLoginStatusMessage.emailInvalidStatus= "";
							currLoginStatusMessage.passwordInvalidStatus = "";
							return currLoginStatusMessage;
						});
						const currLoginStatus = { ...prev };
						currLoginStatus.status = true;
						currLoginStatus.loginResult = response.data.user_email;
						return currLoginStatus;
					});
				}
			});
		}
	};

	return (
		<>
			<form className="login" onSubmit={loginSubmitHandler}>
				<h1>Login</h1>
				<label htmlFor="email">User Email</label>
				<input
					type="text"
					placeholder="User Email..."
					onChange={emailChangeHandler}
					value={userEmailReg}
				/>
				{!registrationFormValidity.userEmailIsValid &&
					registrationStatus.emailInvalidStatus}
				<label htmlFor="password">Password</label>
				<input
					type="password"
					placeholder="User Password..."
					onChange={passwordChangeHandler}
					value={passwordReg}
				/>
				{!registrationFormValidity.userPasswordIsValid &&
					registrationStatus.passwordInvalidStatus}
				<button disabled={registrationFormValidity.formIsValid ? false : true}>
					{" "}
					Login{" "}
				</button>
			</form>
		</>
	);
};

export default Login;