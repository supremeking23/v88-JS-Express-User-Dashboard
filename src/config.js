const mysql = require("mysql2");

const dbConnection = mysql.createConnection({
	host: `localhost`,
	user: `root`,
	password: `root`,
	database: `user_dashboard_express`,
});

dbConnection.connect((err) => {
	if (err) throw err;
	console.log("database connected");
});

module.exports = dbConnection;
