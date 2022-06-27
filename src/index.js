const express = require('express')
const mysql = require('mysql2')
const config = require('./config')

const app = express()
const pool = mysql.createPool(config.db)

app.listen(config.port, () => {
	console.info(`Server started on port ${config.port}`)
})

// Simple query with callback and without connection pool
// The query includes field renaming, joins, and prepared statement
app.get('/1', (_, res) => {
	const query = `
		select p.id, p.name, c.name as company_name
		from product p inner join company c on p.company_id = c.id
		where p.id > ?`
	pool.execute(query, [1], (err, rows, fields) => {
		console.log(err)
		console.log(rows) // Always array
		console.log(fields)
	})
	res.send('Ok')
})

// Query with promise/async/await and connection pool (recommended)
// Try to insert some data into the database (with transaction)
app.get('/2', async (_, res) => {
	const query = 'insert into company(name) values (?)'
	let connection = null
	try {
		connection = await pool.promise().getConnection()
		await connection.beginTransaction()
		const [result] = await connection.execute(query, ['Test company'])
		console.log(result)
		await connection.commit()
	} catch (err) {
		console.error(err)
		if (connection) {
			await connection.rollback()
		}
	} finally {
		if (connection) {
			connection.release()
		}
	}
	res.send('Ok')
})
