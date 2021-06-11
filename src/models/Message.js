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

				[id]
			);

			return row;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}

	// async get_all_messages_by_recipient_id(id) {
	// 	try {
	// 		const [row] = await dbConnection.execute(
	// 			`SELECT users.id as user_id,users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, messages.message, messages.created_at,messages.id as message_id, COUNT(comments.id) as comment_count FROM users INNER JOIN messages INNER JOIN comments ON users.id = messages.from_user_id AND messages.id = comments.message_id WHERE messages.to_user_id = ? GROUP BY message_id,user_id ORDER BY messages.created_at DESC`,

	// 			[id]
	// 		);

	// 		return row;
	// 	} catch (error) {
	// 		console.log(`error on model`);
	// 		console.log(error);
	// 	}
	// }

	async get_message_detail_by_message_id(id) {
		try {
			const [row] = await dbConnection.execute(
				`SELECT users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, messages.message,DATE_FORMAT(messages.created_at,"%M %d %Y") as created_at ,messages.id as message_id FROM users INNER JOIN messages ON users.id = messages.from_user_id  WHERE messages.id = ? ORDER BY messages.created_at DESC`,

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
