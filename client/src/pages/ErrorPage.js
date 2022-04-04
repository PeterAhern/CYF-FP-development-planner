 import { ErrorPageStyles } from "./ErrorPage.styles";
 import Footer from "../Components/LandingComponents/Footer";

 const ErrorPage = () => {
     return (
				<ErrorPageStyles>
					<div className="errorPageSection">
						<h1>Outside Api's Reach</h1>
						<h2>
							Go back <a href="/plan">Home</a>
						</h2>
					</div>
					<div className="footerSection">
						<Footer />
					</div>
				</ErrorPageStyles>
			);
 };

 export default ErrorPage;