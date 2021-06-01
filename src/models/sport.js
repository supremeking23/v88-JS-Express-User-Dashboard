const dbConnection = require("../config");

class Sport {
	constructor() {
		// this.user = {};
		// this.created_at = new Date();
	}

	async getAllSports() {
		try {
			const user = await dbConnection.any("SELECT * FROM sports ");
			return user;
		} catch (error) {}
	}
}

module.exports = new Sport();
