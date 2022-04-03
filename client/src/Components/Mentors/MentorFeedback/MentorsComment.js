import { useState, useCallback, useEffect } from "react";
// import { MentorsCommentStyles } from "./MentorsComment.styles";
import { PopUpFormStyles } from "../../Tasks/PopUpForm.styles";
import moment from "moment";

const MentorsComment = ({ email, id, senderEmail }) => {
	const [comments, setComments] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const utc = new Date();

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
	}, [id, email]);
	useEffect(() => {
		fetchComments();
	}, [fetchComments, refresh]);
	return (
		<PopUpFormStyles>
			<form onSubmit={handleSubmit} className="form">
				<label>
					Comment:
					<textarea value={value.comment} onChange={handleChange} />
				</label>
				<input type="submit" value="Submit" className="btn btn-danger submit" />
			</form>
			
				<ul className="timeline">
					{comments.map((comment, index) => {
						return (
							<li
								key={index}
								className={
									comment.user_email === senderEmail
										? "blue container left"
										: "green container right"
								}
							>
								<div className="content">
									<h5>Sender:{comment.user_email}</h5>
									<h6>{moment(comment.comment_date).format("DD/MM/YY")}</h6>
									<h4>{comment.comment_content}</h4>
								</div>
							</li>
						);
					})}
				</ul>
		</PopUpFormStyles>
	);
};
export default MentorsComment;
