import { useState, useCallback, useEffect } from "react";

const Comment = ({ email, id, senderEmail }) => {
	const utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
	const [value, setValue] = useState({ comment: "", date: utc, gradEmail: email });
	const [comments, setComments] = useState("No feedback yet");

	const fetchCommentsHandler = useCallback(async () => {
		try {
			const response = await fetch(
				`/api/comments/${email}/${id}`
			);

			if (!response.ok) {
				throw new Error("Error, unable to load comments");
			}
			const data = await response.json();
			if(data.length>0){
				const loadedComments = [];
				for (const key in data) {
					loadedComments.push({
						From: data[key].user_email,
						Comment: data[key].comment_content,
						Sent: data[key].comment_date,
					});
				}
				console.log(loadedComments);
				setComments(loadedComments);
			}
		} catch (error) {
			console.log(error.message);
		}
	}, [email, id]);

	useEffect(() => {
		fetchCommentsHandler();
	}, [fetchCommentsHandler, email]);

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
	};

	const handleChange = (e) => {
		setValue({ comment: e.target.value, date: utc, gradEmail: email });
	};
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
				<input
					type="submit"
					value="Send Feedback"
					className="btn btn-danger submit"
				/>
			</form>
			<div className="commentsArea">
				Previous Comments should be displayed here
			</div>
		</div>
	);
};
export default Comment;
