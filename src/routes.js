module.exports = (app) => {
	const userController = require("./controllers/users");
	const user = new userController();
	const messagesController = require("./controllers/Messages");
	const message = new messagesController();

	const commentsController = require("./controllers/Comments");
	const comments = new commentsController();

	app.get("/", user.index);
	app.get("/signin", user.signin);
	app.get("/logout", user.logout);
	app.get("/register", user.register);
	app.get("/admin", user.admin);
	app.get("/dashboard", user.dashboard);
	app.get("/new", user.new);
	app.get("/edit/:id?", user.edit); // "?"  for optional
	app.get("/show/:id?", user.show); // "?"  for optional

	app.get("/show/:id?/:message_id?", comments.comments_from_messages); // "?"  for optional

	app.post("/register_process", user.register_process);
	app.post("/signin_process", user.signin_process);
	app.post("/add_new_process", user.add_new_process);
	app.post("/edit_information_process", user.edit_information_process);
	app.post("/edit_password_process", user.edit_password_process);
	app.post("/edit_description_process", user.edit_description_process);

	app.post("/post_message_process", message.post_message_process);

	// app.post("/filter-by-name", user.filter_name_ajax);
	// app.post("/filter-by-gender", user.filter_gender_ajax);
	// app.post("/filter-by-sports", user.filter_sports_ajax);

	// APP.get("/register-and-login", user.register);
};
