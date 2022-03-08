import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./client";
function SignOutButton(props) {
// 	await supabase.auth.signOut();
// 	setUser(null);
// }
// if (user) {
	return (
		<div>
			<button onClick={props.signout}>Sign out </button>
		</div>
	);
}
export default SignOutButton;
