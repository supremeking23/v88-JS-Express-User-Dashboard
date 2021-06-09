const mysql = require("mysql2");

// class Database{
// 	constructor(host,username,password,database){
// 		this._host = host;
// 		this._username = username;
// 		this._password = password;
// 		this._database = database;
// 	}

// 	async connect(){
// 		try{
// 			this.connection = await = mysql.createConnection({
// 				host:this._host || "localhost",

// 			});
// 		}
// 	}
// }

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
