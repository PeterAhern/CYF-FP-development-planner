require("dotenv").config();

import { Pool } from "pg";

const dbUrl =
	"postgres://nslgmeawwvkrne:85a19734ebcfe8cefaf3fe000145c4a5e87bb100f33ddf85777d1d633a62f9ed@ec2-52-31-221-164.eu-west-1.compute.amazonaws.com:5432/d446hevhor0ncn" ||
	"postgres://localhost:5432/cyf";

const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

export default { query: pool.query.bind(pool) };
