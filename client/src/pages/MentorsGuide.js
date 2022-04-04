import { MentorsGuideStyles } from "./MentorsGuide.styles";
import Navbar from "../Components/Header/Navbar/Navbar";

const MentorsGuide=()=>{
    return (
			<main>
				<Navbar />
				<MentorsGuideStyles>
					<h1>Mentor Guide</h1>
					<h2>The essential need-to-know list for Mentors @CYF</h2>
					<section>
						<h3>About the role:</h3>
						<p>
							Involves supporting two trainees on their career journey, helping
							with goal setting,<br></br> identifying the personal and technical
							skills needed for junior development roles.
						</p>
					</section>
					<section>
						<h3>Activities:</h3>
						<ul>
							<li>Have regular 1:1 sessions with your mentee.</li>
							<li>
								Help facilitate mock interviews Review CVs and give feedback.
							</li>
							<li>Goal setting and career guidance. </li>
							<li>Work with graduates on their Elements.</li>
						</ul>
					</section>
					<section>
						<h3>Starting the Relationship</h3>
						<p>
							During your first meeting with your graduate - mentee you may wish
							to do the following:
						</p>
					</section>
					<section>
						<ul>
							<li>Explain the purpose of the mentoring relationship.</li>
							<li>
								Decide together the format of the meetings and how these will.
							</li>
							<li>Explain your role as mentor and what you will commit to.</li>
							<li>
								Clarify what is expected behaviour from mentees and their role.
							</li>
						</ul>
					</section>
					<section>
						<h3>The Mentoring Sessions</h3>
						<p>During the sessions you may wish to do the following: </p>
						<ul>
							<li>Review experience.</li>
							<li>Identify goal and objectives.</li>
							<li>Provide feedback. </li>
							<li>Identify areas of development.</li>
							<li>Identify strengths and achievements.</li>
							<li>Explore options.</li>
							<li>Agree support needs.</li>
							<li>Set targets for future actions.</li>
							<li>
								Create networking opportunities for mentees to gain experience.
							</li>
						</ul>
					</section>
					<section>
						<h3>Ending the Relationship</h3>
						<ul>
							<li>
								Mentoring should end six months after Demo Day or when a mentee
								secures employment.
							</li>
							<li>Summarise and celebrate achievements.</li>
							<li>Help your mentee to identify their next steps. </li>
							<li>
								Both mentee and mentor should reflect on the effectiveness of
								the relationship.
							</li>
						</ul>
					</section>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
				</MentorsGuideStyles>
			</main>
		);
};
export default MentorsGuide;