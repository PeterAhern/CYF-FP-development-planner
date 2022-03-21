import { useState, useEffect, useCallback } from "react";
import "./ AllGraduates.css";

const AllGraduates = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState([]);
	const [term, setTerm] = useState("");
	const [clicked, setClicked] = useState(false);
	const [graduate, setGraduate] = useState([]);
	const fetchUsersHandler = useCallback(async () => {
		try {
			const response = await fetch("/api/graduates");

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		fetchUsersHandler();
	}, [fetchUsersHandler]);
	const onChange = (e) => {
		setTerm(e.target.value);
		console.log(users);
		setSearch(users.filter((user) => user.user_email.includes(term)));
		setClicked(false);
	};
	const addGraduate = (email) => {
		setGraduate(graduate.concat(email));
	};
	console.log(graduate);
	return (
		<>
			<div>
				<input
					type="text"
					id="customerName"
					className="searchBar"
					placeholder="Search"
					value={term}
					onChange={onChange}
				/>
			</div>
			<button onClick={() => setClicked(!clicked)}>All Graduates</button>
			{clicked &&
				users.map((user, index) => (
					<h5 key={index}>
						{user.user_email}{" "}
						<button onClick={() => addGraduate(user.user_email)}>add</button>
					</h5>
				))}

			{term.length > 0 &&
				search.map((user, index) => (
					<h5 key={index}>
						Graduate {user.user_email}
						<button>add</button>
					</h5>
				))}
			<div className="mentees">
<h3>my mentees</h3>
				{graduate.map((item, index) => (
					<h5 key={index}>{item}<button>delete</button></h5>
				))}
			</div>
		</>
	);
};
export default AllGraduates;
