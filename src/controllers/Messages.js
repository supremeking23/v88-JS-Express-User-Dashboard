const userModel = require("../models/user");
const messageModel = require("../models/Message");

class Messages {
	async post_message_process(req, res) {
		// res.json(req.body);

		let notification = {};
		let create_message = new messageModel(req.body);
		create_message.send_message();
		notification.style = "alert-primary";
		notification.message = "message has been sent successfully";
		req.session.notification = notification;
		res.redirect(`/show/${req.body.message_to}`);
	}
}

module.exports = Messages;
