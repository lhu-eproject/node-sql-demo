const dotenv = require('dotenv')
const express = require('express')

dotenv.config()
const app = express()

app.get('/', (_, res) => {
	res.send('Hello World!')
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
	console.info(`Server started on port ${PORT}`)
})
