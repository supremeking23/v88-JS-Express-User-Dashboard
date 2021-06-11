const dbConnection = require("../config").promise();
// const { dateDifference } = require("../my_module/utilities")();

class Comment {
	constructor(comment) {
		this._user_id = comment != undefined ? comment.comment_from : ""; // sender
		this._message_id = comment != undefined ? comment.message_id : "";
		this._comment = comment != undefined ? comment.comment_text : "";
		this._createad_at = new Date();
	}

	async send_comment() {
		try {
			const [row] = await dbConnection.execute(`INSERT INTO comments(user_id,message_id,comment,created_at) VALUES(?,?,?,?)`, [
				this._user_id,
				this._message_id,
				this._comment,
				this._createad_at,
			]);

			return row;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}

	async get_all_replies_by_message_id(message_id) {
		try {
			const [row] = await dbConnection.execute(
				`SELECT users.first_name,users.last_name,CONCAT(users.first_name,' ',users.last_name) AS full_name, comments.comment, comments.created_at,comments.id as comment_id FROM users INNER JOIN comments ON users.id = comments.user_id WHERE comments.message_id = ? ORDER BY comments.created_at DESC`,

				[message_id]
			);

			return row;
		} catch (error) {
			console.log(`error on model`);
			console.log(error);
		}
	}

	async count_comments_by_message_id(message_id) {
		try {
			const [row] = await dbConnection.execute(
				`SELECT COUNT(*) FROM comments WHERE message_id = ?`,

				[message_id]
			);

			return row;
		} catch (error) {}
	}

	// $query = "SELECT users.first_name, users.last_name, users.id,replies.user_id,replies.reply,replies.created_at FROM users INNER JOIN replies ON users.id = replies.user_id WHERE replies.message_id = ?  ORDER BY replies.created_at DESC";

	// return $this->db->query($query,array($message["message_id"]))->result_array();
}

module.exports = Comment;
