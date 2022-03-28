import { useState, useCallback, useEffect } from "react";

const Comment = ({ email, id, senderEmail }) => {
	const [comments, setComments] = useState([]);
	const [refresh, setRefresh] = useState(false);

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
			throw new Error("Failed to add new comment");
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
		refreshFunc();
	};
	const refreshFunc = () => {
		setRefresh(!refresh);
	};

	const fetchComments = useCallback(async () => {
		try {
			const response = await fetch(
				`/api/comments/elements/${id}/grad/${email}`
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();
			setComments(data);
		} catch (error) {
			console.log(error);
		}
	}, [ id, email]);
	useEffect(() => {
		fetchComments();
	}, [fetchComments,refresh]);
	console.log(comments);
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
				<ul>
					{comments.map((comment, index) => {
						return (
							<li key={index}>
								<h6>sender:{comment.user_email}</h6>
								<h6> {comment.comment_date.slice(0, 10).replace(/-/g, "-")}</h6>
								<h5>{comment.comment_content}</h5>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
export default Comment;
