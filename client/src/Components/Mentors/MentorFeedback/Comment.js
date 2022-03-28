import { useState } from "react";

const Comment = ({ email, id, senderEmail }) => {
	const utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

	const [value, setValue] = useState({
		comment: "",
		date: utc,
		gradEmail: email,
	});
	const addCommentOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(value),
	};
	const addComment = async () => {
		const response = await fetch(
			`/api/comments/${senderEmail}/elements/${id}/`,
			addCommentOptions
		);
		if (!response.ok) {
			throw new Error("Failed to add new task");
		}
	};
	const handleChange = (e) => {
		setValue({ comment: e.target.value, date: utc, gradEmail: email });
	};
	console.log(value);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await addComment();
		setValue({ comment: "", date: utc, gradEmail: email });
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="form">
				<label>
					Comment:
					<textarea value={value.comment} onChange={handleChange} />
				</label>
				<input type="submit" value="Submit" className="btn btn-danger submit" />
			</form>
			<div className="commentsArea">
				<h1> comments go here</h1>
			</div>
		</div>
	);
};
export default Comment;
