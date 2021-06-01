const dbConnection = require("../config");

class User {
	constructor() {
		// this.user = {};
		// this.created_at = new Date();
	}

	// set's user data and return this.user with first_name etc
	// trying to use the getters and setters before, failed to implement it
	// userData(user) {
	// 	let data = {
	// 		first_name: user.firstname,
	// 		last_name: user.lastname,
	// 		email: user.email,
	// 		password: user.password,
	// 		created_at: this.created_at,
	// 	};
	// 	this.user = data;
	// 	return this.user;
	// }

	// async create(newUser) {
	// 	const user = await dbConnection.any("INSERT INTO users (first_name,last_name,email,password,created_at) VALUES ($1,$2,$3,$4,$5)", [
	// 		newUser.first_name,
	// 		newUser.last_name,
	// 		newUser.email,
	// 		newUser.password,
	// 		newUser.created_at,
	// 	]);

	// 	return user;
	// }

	// async findByEmail(email) {
	// 	const user = await dbConnection.any("SELECT * FROM users WHERE email = $1 ", [email]);
	// 	return user;
	// }

	async getAllPlayers() {
		try {
			const user = await dbConnection.any("SELECT * FROM users ");
			return user;
		} catch (error) {}
	}

	async filter_name(name) {
		try {
			const user = await dbConnection.any(`SELECT * FROM users WHERE name LIKE   '%'||$1||'%' `, [name]);
			return user;
		} catch (error) {}
	}

	async filter_gender(gender) {
		try {
			const user = await dbConnection.any(`SELECT * FROM users WHERE gender = $1 OR gender = $2 `, [gender[0], gender[1]]);
			return user;
		} catch (error) {}
	}

	async filter_sport(sport) {
		try {
			const user = await dbConnection.any(
				`SELECT * FROM users WHERE sport_id = $1 OR sport_id = $2 OR sport_id = $3 OR sport_id = $4 OR sport_id = $5 OR sport_id = $6 `,
				[sport[0], sport[1], sport[2], sport[3], sport[4], sport[5]]
			);
			return user;
		} catch (error) {}
	}
}

module.exports = new User();

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
