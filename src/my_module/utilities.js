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

		dateDifference: (date) => {
			let datetime1 = new Date(date);
			let datetime2 = new Date();

			let diff = Math.abs(datetime1.getMinutes() - datetime2.getMinutes());

			return [
				Math.abs(datetime1.getFullYear() - datetime2.getFullYear()),
				Math.abs(datetime1.getMonth() - datetime2.getMonth()),
				Math.abs(datetime1.getDate() - datetime2.getDate()),
				// datetime1.getDate(),
				Math.abs(datetime1.getHours() - datetime2.getHours()),
				Math.abs(datetime1.getMinutes() - datetime2.getMinutes()),
				Math.abs(datetime1.getSeconds() - datetime2.getSeconds()),
			];
		},
	};
};
