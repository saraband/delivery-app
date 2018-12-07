export default {
	// Tests if the username is between 4 and 50 characters
	username: un => /^.{4,10}$/.test(un),

	// Tests if the email is valid
	email: str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str),

	// Tests if the password has at least 8 characters, an uppercase letter and a number
	password: pw => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw)
}
