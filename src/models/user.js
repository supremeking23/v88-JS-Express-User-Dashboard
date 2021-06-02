const dbConnection = require("../config").promise();

class User {
	constructor(user) {
		// this.user = {};
		// this.created_at = new Date();
		this._first_name = user != undefined ? user.firstname : "";
		this._last_name = user != undefined ? user.lastname : "";
		this._email = user != undefined ? user.email : "";
		this._password = user != undefined ? user.password : "";
		this._user_level = 1; // 1 for normal user 9 for admin
		this._created_at = new Date();
		console.log(this);
	}

	set password(password) {
		this._password = password;
	}

	async save() {
		try {
			const [row] = await dbConnection.execute(
				`INSERT INTO users(first_name,last_name,email,password,user_level,created_at) VALUES(?,?,?,?,?,?)`,
				[this._first_name, this._last_name, this._email, this._password, this._user_level, this._created_at]
			);

			return row;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}

	async find_email(email) {
		try {
			const [rows, fields] = await dbConnection.execute(`SELECT * FROM users WHERE email = ?`, [email]);

			return rows;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}

	// async find_email(email) {
	// 	dbConnection.query('SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45', function (err, results, fields) {
	// 		console.log(results); // results contains rows returned by server
	// 		console.log(fields); // fields contains extra meta data about results, if available
	// 	});
	// }
}

module.exports = User;

// let user = function (user) {
// 	this.first_name = user.firstname;
// 	this.last_name = user.lastname;
// 	this.email = user.email;
// 	this.password = user.password;
// 	this.created_at = new Date();
// 	// this.updated_at = new Date();
// };

// //? using .then chain
// // user.create = function (newUser) {
// // 	return dbConnection.one("INSERT INTO users (first_name,last_name,email,password,created_at) VALUES ($1,$2,$3,$4,$5)", [
// // 		newUser.first_name,
// // 		newUser.last_name,
// // 		newUser.email,
// // 		newUser.password,
// // 		newUser.created_at,
// // 	])
// // 		.then((data) => {
// // 			console.log(data.id);
// // 			return data.id;
// // 		})
// // 		.catch((error) => {
// // 			console.log("ERROR:", error); // print error;
// // 		});
// // };

// // ?using async await
// user.create = async function (newUser) {
// 	const user = await dbConnection.any("INSERT INTO users (first_name,last_name,email,password,created_at) VALUES ($1,$2,$3,$4,$5)", [
// 		newUser.first_name,
// 		newUser.last_name,
// 		newUser.email,
// 		newUser.password,
// 		newUser.created_at,
// 	]);

// 	return user;
// };

// // ?using async await
// user.findByEmail = async function (email) {
// 	const user = await dbConnection.any("SELECT * FROM users WHERE email = $1 ", [email]);
// 	return user;
// };

// module.exports = user;
