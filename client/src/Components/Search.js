import { useState, useEffect } from "react";
import "./AllUsers.css";

const Search = () => {
	const [users, setUsers] = useState([]);

	const [term, setTerm] = useState("");
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`/api/users?term=${term}`);

				if (!response.ok) {
					throw new Error("Something went wrong!");
				}

				const data = await response.json();

				setUsers(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
	}, [term]);
const changeHandler=(e)=>{
	setTerm(e.target.value);

};
	return (
		<div>
			<input
				type="text"
				id="search Graduate email"
				placeholder="Search "
				value={term}
				onChange={changeHandler}
				className = "searchBar"
			/>
			{users.map((user, index) => (
				<h1 key={index}>{user.user_email}</h1>
			))}
		</div>
	);
};
export default Search;
