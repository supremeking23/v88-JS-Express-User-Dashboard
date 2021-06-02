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
		res.render("index");
	}

	signin(req, res) {
		res.render("signin");
	}

	register(req, res) {
		res.render("register", {
			notification: req.session.notification != undefined ? req.session.notification : undefined,
			form_errors: req.session.form_errors != undefined ? req.session.form_errors : undefined,
		});
		req.session.destroy();
	}

	admin(req, res) {
		res.render("admin");
	}

	new(req, res) {
		res.render("new");
	}

	edit(req, res) {
		res.render("edit");
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
}

module.exports = Users;
