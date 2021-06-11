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
					let user = new userModel();
					let message = new messageModel();
					let comment = new commentModel();

					//get the recipient
					let found_user = await user.find_user_by_id(req.params.id);

					//get the sender
					let message_detail = await message.get_message_detail_by_message_id(req.params.message_id);
					// console.log(message_detail);
					let get_comments = await comment.get_all_replies_by_message_id(req.params.message_id);

					//get the replies/comments

					res.render("comments", {
						notification: req.session.notification != undefined ? req.session.notification : undefined,
						form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,
						found_user: found_user[0],
						message_detail: message_detail[0],
						get_comments,
						user: obj,
					});

					req.session.destroy();
				});
			}
		});
	}

	async post_comment_process(req, res) {
		let notification = {};
		let create_comment = new commentModel(req.body);
		create_comment.send_comment();
		notification.style = "alert-primary";
		notification.message = "comment has been sent successfully";
		req.session.notification = notification;
		res.redirect(`/show/${req.body.comment_to}/${req.body.message_id}`);
	}
}

module.exports = Comments;
