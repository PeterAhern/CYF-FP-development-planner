import express from "express";
import morgan from "morgan";
import path from "path";
import helmet from 'helmet'

import router from "./api";
import {
	configuredHelmet,
	httpsOnly,
	logErrors,
	pushStateRouting,
} from "./middleware";

const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "unpkg.com", "polyfill.io", "http://*", "https://*"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// app.use(express.static(__dirname + "/"));

app.use(express.json());
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

export default app;
