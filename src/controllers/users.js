const userModel = require("../models/user");
const sportModel = require("../models/sport");
const { validateEmail, formError, messageHandler } = require("../my_module/utilities")();
const { registrationValidation, loginValidation } = require("../my_module/validation")();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const redis = require("redis");
const user = require("../models/user");
const { json } = require("body-parser");
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
		res.render("register");
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
}

module.exports = Users;
