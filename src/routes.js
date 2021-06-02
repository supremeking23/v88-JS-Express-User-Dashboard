module.exports = (app) => {
	const userController = require("./controllers/users");
	const user = new userController();

	app.get("/", user.index);
	app.get("/signin", user.signin);
	app.get("/register", user.register);
	app.get("/admin", user.admin);
	app.get("/new", user.new);
	app.get("/edit/:id?", user.edit); // "?"  for optional
	app.get("/show/:id?", user.show); // "?"  for optional

	app.post("/register_process", user.register_process);
	// app.post("/filter-by-name", user.filter_name_ajax);
	// app.post("/filter-by-gender", user.filter_gender_ajax);
	// app.post("/filter-by-sports", user.filter_sports_ajax);

	// APP.get("/register-and-login", user.register);
};
