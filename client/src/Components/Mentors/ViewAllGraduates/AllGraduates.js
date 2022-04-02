import { useState, useEffect, useCallback } from "react";
import { AllGraduatesStyles } from "./AllGraduates.styles";
import MentorGraduate from "./MentorGraduates";

const AllGraduates = ({ mentorEmail, gradRefreshFunc }) => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState([]);
	const [term, setTerm] = useState("");
	const [clicked, setClicked] = useState(false);
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
		setSearch(users.filter((user) => user.user_email.toLowerCase().includes(term)));
		setClicked(false);
	};
	return (
			<AllGraduatesStyles>
				<div className="searchAll">
					<input
						type="text"
						className="searchBar"
						placeholder="Search all graduates"
						value={term}
						onChange={onChange}
					/>
					<button
						className="allGrads btn btn-danger"
						onClick={() => setClicked(!clicked)}
					>
						All Graduates
					</button>
				</div>
				<ul className="list">
					{clicked &&
						users.map((user, index) => (
							<li key={index}>
								<MentorGraduate
									user={user.user_email}
									gradRefreshFunc={gradRefreshFunc}
									mentorEmail={mentorEmail}
								/>
							</li>
						))}
				</ul>
				<ul className="list searchList">
					{term.length > 0 &&
						search.map((user, index) => (
							<li key={index}>
								<MentorGraduate
									user={user.user_email}
									gradRefreshFunc={gradRefreshFunc}
									mentorEmail={mentorEmail}
								/>
							</li>
						))}
				</ul>
			</AllGraduatesStyles>
	);
};
export default AllGraduates;
