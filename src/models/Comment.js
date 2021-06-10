const dbConnection = require("../config").promise();
// const { dateDifference } = require("../my_module/utilities")();

class Comment {
	constructor(message) {
		this._from_user_id = message != undefined ? message.message_from : "";
		this._to_user_id = message != undefined ? message.message_to : "";
		this._message = message != undefined ? message.message_text : "";
		this._createad_at = new Date();
	}

	// async send_message() {
	// 	try {
	// 		const [row] = await dbConnection.execute(`INSERT INTO messages(from_user_id,to_user_id,message,created_at) VALUES(?,?,?,?)`, [
	// 			this._from_user_id,
	// 			this._to_user_id,
	// 			this._message,
	// 			this._createad_at,
	// 		]);

	// 		return row;
	// 	} catch (error) {
	// 		console.log(`error on model`);
	// 		console.log(error);
	// 	}
	// }

	async get_all_replies_by_message_id(message_id) {
		try {
			const [row] = await dbConnection.execute(
				`SELECT users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, comments.comment, comments.created_at,comments.id as comment_id FROM users INNER JOIN comments ON users.id = messages.to_user_id  WHERE comments.message_id = ? ORDER BY comments.created_at DESC`,

				[message_id]
			);

			return row;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}

	// $query = "SELECT users.first_name, users.last_name, users.id,replies.user_id,replies.reply,replies.created_at FROM users INNER JOIN replies ON users.id = replies.user_id WHERE replies.message_id = ?  ORDER BY replies.created_at DESC";

	// return $this->db->query($query,array($message["message_id"]))->result_array();

	async get_all_messages_by_recipient_id(id) {
		try {
			const [row] = await dbConnection.execute(
				`SELECT users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, messages.message, messages.created_at FROM users INNER JOIN messages ON users.id = messages.from_user_id  WHERE messages.to_user_id = ? ORDER BY messages.created_at DESC`,
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

module.exports = Comment;
