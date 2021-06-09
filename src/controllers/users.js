const userModel = require("../models/user");
const { validateEmail, formError, messageHandler } = require("../my_module/utilities")();
const { registrationValidation, loginValidation } = require("../my_module/validation")();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const redis = require("redis");
const client = redis.createClient(6379); //port number is optional

client.on("connect", function () {
	console.log("Connected to Redis...");
});

client.on("error", function (error) {
	console.error(error);
});

class Users {
	constructor() {}

	index(req, res) {
		client.exists("user_session", (err, result) => {
			client.hgetall("user_session", (err, obj) => {
				res.render("index", { user: obj });
			});
		});
		// res.render("index");
	}

	signin(req, res) {
		client.exists("user_session", (err, result) => {
			client.hgetall("user_session", (err, obj) => {
				res.render("signin", {
					notification: req.session.notification != undefined ? req.session.notification : undefined,
					form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,
					user: obj,
				});
				req.session.destroy();
			});
		});

		// res.render("signin", {
		// 	notification: req.session.notification != undefined ? req.session.notification : undefined,
		// 	form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,
		// });
		// req.session.destroy();
	}

	register(req, res) {
		client.exists("user_session", (err, result) => {
			client.hgetall("user_session", (err, obj) => {
				res.render("register", {
					notification: req.session.notification != undefined ? req.session.notification : undefined,
					form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,
					user: obj,
				});
				req.session.destroy();
			});
		});

		// res.render("register", {
		// 	notification: req.session.notification != undefined ? req.session.notification : undefined,
		// 	form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,
		// });
		// req.session.destroy();
	}

	async admin(req, res) {
		client.exists("user_session", async (err, result) => {
			if (result == 0) {
				res.redirect("/");
			} else {
				let user = new userModel();
				let users = await user.get_all_users();
				client.hgetall("user_session", (err, obj) => {
					res.render("admin", { user: obj, users });
				});
			}
		});

		// res.render("admin");
	}

	logout(req, res) {
		client.del("user_session");
		res.redirect("/");
	}

	new(req, res) {
		client.exists("user_session", async (err, result) => {
			if (result == 0) {
				res.redirect("/");
			} else {
				client.hgetall("user_session", (err, obj) => {
					res.render("new", {
						notification: req.session.notification != undefined ? req.session.notification : undefined,
						form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,
						user: obj,
					});
					req.session.destroy();
				});
			}
		});
		// res.render("new");
	}

	edit(req, res) {
		client.exists("user_session", async (err, result) => {
			if (result == 0) {
				res.redirect("/");
			} else {
				client.hgetall("user_session", async (err, obj) => {
					let user = new userModel();
					let user_to_edit;
					let found_user;
					if (req.params.id != undefined) {
						let user = new userModel();
						found_user = await user.find_user_by_id(req.params.id);
						user_to_edit = found_user[0];
					} else {
						found_user = await user.find_user_by_id(obj.user_id);
						user_to_edit = found_user[0];
					}
					res.render("edit", {
						notification: req.session.notification != undefined ? req.session.notification : undefined,
						form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,
						user_to_edit,
						user: obj,
					});

					req.session.destroy();
				});
			}
		});
		// res.render("edit");
	}

	show(req, res) {
		res.render("show");
	}

	// process
	async register_process(req, res) {
		try {
			let form_error_array = registrationValidation(req.body, validateEmail);

			if (form_error_array.length > 0) {
				// req.session.form_errors = form_error_array;
				// let form_error = {
				// 	type: "register",
				// 	errors: form_error_array,
				// };
				// req.session.form_errors = form_error_array;
				req.session.form_errors = form_error_array;
				res.redirect("/register");
				return false;
			}

			let new_user = new userModel(req.body);
			let found_email = await new_user.find_email(req.body.email);
			let notification = {};
			if (found_email.length > 0) {
				notification.style = "alert-danger";
				notification.message = "Error, email already in the database";
			} else {
				let hash_pass = await bcrypt.hash(req.body.password, saltRounds);
				new_user.password = hash_pass;
				let created_user = await new_user.save();
				if (created_user.affectedRows == 1) {
					notification.style = "alert-primary";
					notification.message = "user has been created";
				}
				// console.log(hash_pass);
			}
			req.session.notification = notification;
			res.redirect("/register");
		} catch (error) {
			console.log(`error on controller`);
			console.log(error);
		}
	}

	async signin_process(req, res) {
		try {
			let form_error_array = registrationValidation(req.body, validateEmail);

			let notification = {};
			if (form_error_array.length > 0) {
				req.session.form_errors = form_error_array;
				res.redirect("/signin");
				return false;
			}

			let user = new userModel();
			let found_email = await user.find_email(req.body.email);

			if (found_email.length > 0) {
				// console.log(found_email[0].BinaryRow);
				// console.log(typeof found_email);
				// console.log(found_email[0].password);
				const match = await bcrypt.compare(req.body.password, found_email[0].password);
				if (match) {
					client.hmset(
						"user_session",
						[
							"first_name",
							found_email[0].first_name,
							"last_name",
							found_email[0].last_name,
							"email",
							found_email[0].email,
							"is_logged_in",
							true,
							"user_level",
							found_email[0].user_level,
							"user_id",
							found_email[0].id,
						],
						(err, result) => {
							console.log(`here are the results ${result}`);
						}
					);

					res.redirect("admin");
				} else {
					notification.style = "alert-danger";
					notification.message = "Wrong password";
				}
			} else {
				notification.style = "alert-danger";
				notification.message = "Unknown user";
			}

			req.session.notification = notification;
			res.redirect("/signin");
		} catch (error) {}
	}

	async add_new_process(req, res) {
		try {
			let form_error_array = registrationValidation(req.body, validateEmail);

			if (form_error_array.length > 0) {
				// req.session.form_errors = form_error_array;
				// let form_error = {
				// 	type: "register",
				// 	errors: form_error_array,
				// };
				// req.session.form_errors = form_error_array;
				req.session.form_errors = form_error_array;
				res.redirect("/new");
				return false;
			}

			let new_user = new userModel(req.body);
			let found_email = await new_user.find_email(req.body.email);
			let notification = {};
			if (found_email.length > 0) {
				notification.style = "alert-danger";
				notification.message = "Error, email already in the database";
			} else {
				let hash_pass = await bcrypt.hash(req.body.password, saltRounds);
				new_user.password = hash_pass;
				let created_user = await new_user.save();
				if (created_user.affectedRows == 1) {
					notification.style = "alert-primary";
					notification.message = "user has been created";
				}
				// console.log(hash_pass);
			}
			req.session.notification = notification;
			res.redirect("/new");
		} catch (error) {}
	}

	async edit_information_process(req, res) {
		client.hgetall("user_session", async (err, obj) => {
			let form_error_array = registrationValidation(req.body, validateEmail);
			if (form_error_array.length > 0) {
				req.session.form_errors = form_error_array;
				if (obj.user_id === req.body.user_id) {
					res.redirect(`/edit`);
				} else {
					res.redirect(`/edit/${req.body.user_id}`);
				}
				return false;
			}

			let user = new userModel();

			let edit_user = await user.edit_user_information(req.body);
			// console.log(edit_user);
			let notification = {};
			if (edit_user.affectedRows > 0) {
				notification.style = "alert-primary";
				notification.message = "user information has been updated successufully";
				req.session.notification = notification;
				if (obj.user_id === req.body.user_id) {
					res.redirect(`/edit`);
				} else {
					res.redirect(`/edit/${req.body.user_id}`);
				}
			}
		});
	}

	async edit_password_process(req, res) {
		client.hgetall("user_session", async (err, obj) => {
			let form_error_array = registrationValidation(req.body, validateEmail);
			if (form_error_array.length > 0) {
				req.session.form_errors = form_error_array;
				if (obj.user_id === req.body.user_id) {
					res.redirect(`/edit`);
				} else {
					res.redirect(`/edit/${req.body.user_id}`);
				}
				return false;
			}

			let hash_pass = await bcrypt.hash(req.body.password, saltRounds);
			let user = new userModel();
			req.body.password = hash_pass;
			let edit_user = await user.edit_user_password(req.body);
			// // console.log(edit_user);
			let notification = {};
			if (edit_user.affectedRows > 0) {
				notification.style = "alert-primary";
				notification.message = "user password has been updated successufully";
				req.session.notification = notification;
				if (obj.user_id === req.body.user_id) {
					res.redirect(`/edit`);
				} else {
					res.redirect(`/edit/${req.body.user_id}`);
				}
			}
		});
	}
}

module.exports = Users;
