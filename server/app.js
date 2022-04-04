import express from "express";
import morgan from "morgan";
import path from "path";

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

import router from "./api";
import {
	configuredHelmet,
	httpsOnly,
	logErrors,
	pushStateRouting,
} from "./middleware";
let cors = require("cors");
const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");
const app = express();
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		key: "userId",
		secret: "elemental",
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24,
		},
	})
);


app.use(configuredHelmet());
app.use(morgan("dev"));

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, router);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

app.use(logErrors());

app.get("/*", (req, res) => {
	res.status(404).send({ success: false, message: "outside API s reach" });
});

export default app;
