const dbConnection = require("../config").promise();
// const { dateDifference } = require("../my_module/utilities")();

class Message {
	constructor(message) {
		this._from_user_id = message != undefined ? message.message_from : "";
		this._to_user_id = message != undefined ? message.message_to : "";
		this._message = message != undefined ? message.message_text : "";
		this._createad_at = new Date();
	}

	async send_message() {
		try {
			const [row] = await dbConnection.execute(`INSERT INTO messages(from_user_id,to_user_id,message,created_at) VALUES(?,?,?,?)`, [
				this._from_user_id,
				this._to_user_id,
				this._message,
				this._createad_at,
			]);

			return row;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}

	async get_all_messages_by_recipient_id(id) {
		try {
			const [row] = await dbConnection.execute(
				`SELECT users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, messages.message, messages.created_at,messages.id as message_id FROM users INNER JOIN messages ON users.id = messages.from_user_id  WHERE messages.to_user_id = ? ORDER BY messages.created_at DESC`,
				// "SELECT users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, messages.message, messages.created_at, " + dateDifference(+"messages.created_at"+) +" FROM users INNER JOIN messages ON users.id = messages.from_user_id  WHERE messages.to_user_id = ? ORDER BY messages.created_at DESC",
				[id]
			);

			return row;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}

	async get_message_detail_by_message_id(id) {
		try {
			const [row] = await dbConnection.execute(
				`SELECT users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, messages.message, messages.created_at,messages.id as message_id FROM users INNER JOIN messages ON users.id = messages.from_user_id  WHERE users.id = ? ORDER BY messages.created_at DESC`,
				// "SELECT users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, messages.message, messages.created_at, " + dateDifference(+"messages.created_at"+) +" FROM users INNER JOIN messages ON users.id = messages.from_user_id  WHERE messages.to_user_id = ? ORDER BY messages.created_at DESC",
				[id]
			);
			return row;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}
}

module.exports = Message;
