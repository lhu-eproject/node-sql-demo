const dotenv = require("dotenv")

// Load .env file to process.env
dotenv.config()

// Make sure all required env variables are set
const REQUIRED_ENV = [
	"PORT",
	"DB_HOST",
	"DB_PORT",
	"DB_USER",
	"DB_PASSWORD",
	"DB_NAME",
]
for (const env of REQUIRED_ENV) {
	let ok = true
	if (process.env[env] === undefined || process.env[env] === null) {
		console.error(`Missing required env variable: ${env}`)
		ok = false
	}
	if (!ok) {
		process.exit(2) // Exit code 1 is used for general errors
	}
}

module.exports = {
	port: process.env.PORT,
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
}
