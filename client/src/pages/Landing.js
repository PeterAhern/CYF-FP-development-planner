import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import SignOutButton from "../SignOutButton";

import "./Landing.css";
import logo from "./logo.svg";

export function Landing(props) {
	const [user, setUser] = useState(null);

	// useEffect(() => {
	// 	fetch("/api")
	// 		.then((res) => {
	// 			if (!res.ok) {
	// 				throw new Error(res.statusText);
	// 			}
	// 			return res.json();
	// 		})
	// 		.then((body) => {
	// 			setMessage(body.message);
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// }, []);
	useEffect(() => {
		checkUser();
		window.addEventListener("hashchange", function () {
			checkUser();
		});
	}, []);
	async function checkUser() {
		const user = supabase.auth.user();
		setUser(user);
	}
	async function signInWithGithub() {
		await supabase.auth.signIn({
			provider: "github",
		});
	}
	async function signOut() {
		await supabase.auth.signOut();
		setUser(null);
	}
	if (user) {
		return (
			<div>
				<h1>Hello, { props.user(user.email) }</h1>
				<SignOutButton signout={signOut} />
				<Link to="/myPlan">
					<button>Take me to my plan</button>
				</Link>
			</div>
		);
	}
	return (
		<main role="main">
			<div>
				<h1>Sign in !</h1>
				<button onClick={signInWithGithub}>Sign in</button>
			</div>
		</main>
	);
}

export default Landing;
