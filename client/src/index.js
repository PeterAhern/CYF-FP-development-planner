import ReactDOM from "react-dom";
// import Favicon from "react-favicon";
import { BrowserRouter } from "react-router-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";

import "./index.css";

import App from "./App";

ReactDOM.render(
	<BrowserRouter>
		{/* <Favicon url="./favicon.ico" /> */}
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
