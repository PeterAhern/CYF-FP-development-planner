import { useState, useCallback, useEffect } from "react";
import moment from "moment";


const Comment = ({ email, id, senderEmail, refresh, refreshFunc }) => {
	const utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
	const [value, setValue] = useState({ comment: "", date: utc, gradEmail: email });
	const [comments, setComments] = useState([]);

	const fetchComments = useCallback(async () => {
		try {
			const response = await fetch(
				`/api/comments/${email}/${id}`
			);

			if (!response.ok) {
				throw new Error("Error, unable to load comments");
			}
			const data = await response.json();
				setComments(data);

		} catch (error) {
			console.log(error.message);
		}
	}, [email, id]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments, email]);

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
			`/api/comments/${senderEmail}/elements/${id}`,
			addCommentOptions
		);
		if (!response.ok) {
			throw new Error("Failed to add new task");
		}
		refreshFunc();
	};

	const handleChange = (e) => {
		setValue({ comment: e.target.value, date: utc, gradEmail: email });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await addComment();
		setValue({ comment: "", date: utc, gradEmail: email });
	};

	useEffect(() => {
		fetchComments();
	}, [fetchComments, refresh]);

	let previousComments = comments.map((comment, index)=>{
		return (
			<li key={index}>
				<h5>Feedback: {comment.comment_content}</h5>
				<h6>Sent: {moment.utc(comment.comment_date.slice(0, 10).replace(/-/g, "-")).format("DD/MM/YY")}</h6>
				<h6>From: {comment.user_email}</h6>
			</li>
		);
	});

	return (
		<div>
			<form onSubmit={handleSubmit} className="form">
				<label>
					Comment:
					<textarea value={value.comment} onChange={handleChange} />
				</label>
				<input
					type="submit"
					value="Send Feedback"
					className="btn btn-danger submit"
				/>
			</form>
			<div className="commentsArea">
				<ul>{previousComments}</ul>
			</div>
		</div>
	);
};
export default Comment;
