const userModel = require("../models/user");
const messageModel = require("../models/Message");
const commentModel = require("../models/Comment");
const redis = require("redis");
const client = redis.createClient(6379); //port number is optional
class Comments {
	async comments_from_messages(req, res) {
		client.exists("user_session", async (err, result) => {
			if (result == 0) {
				res.redirect("/");
			} else {
				client.hgetall("user_session", async (err, obj) => {
					let message = new messageModel();
					let comment = new commentModel();

					let message_detail = await comment.get_all_replies_by_message_id(req.params.message_id);
					console.log(message_detail);
					// let get_comments = await comment.get_all_replies_by_message_id(req.params.message_id);

					res.render("comments", {
						notification: req.session.notification != undefined ? req.session.notification : undefined,
						form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,

						// get_comments,
						user: obj,
					});

					req.session.destroy();
				});
			}
		});

		// res.render("comments", {
		// 	notification: req.session.notification != undefined ? req.session.notification : undefined,
		// 	form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,

		// 	user: obj,
		// });
	}
}

module.exports = Comments;
