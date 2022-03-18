import { useState, useEffect, useCallback } from "react";

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const fetchUsersHandler = useCallback(async () => {
		try {
			const response = await fetch("/api/users");

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
	return (
		<>
			<ul>
				{users.map((user,index) => (
					<li key={index}>Email: {user.user_email}</li>
				))}
			</ul>
		</>
	);
};
export default AllUsers;
