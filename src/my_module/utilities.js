// function validateEmail(input) {
// 	if (/(^\w.*@\w+\.\w)/.test(input)) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

module.exports = () => {
	return {
		validateEmail: (input) => {
			if (input && /(^\w.*@\w+\.\w)/.test(input)) {
				return true;
			} else {
				return false;
			}
		},
		formError: (type, errors) => {
			return {
				type,
				errors,
			};
		},

		messageHandler: (title, content) => {
			return {
				title,
				content,
			};
		},

		dateDifference: (date, date_format = `%y %m %d %h %i %s`) => {
			let datetime1 = new Date(date);
			let datetime2 = new Date();

			let diff = new Date(datetime1 - datetime2);

			return diff;
		},
	};
};
