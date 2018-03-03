const MembershipApplication = require("../../models/membership_application")

exports.validApplication = new MembershipApplication(
	{
		first: "Test",
		last: "User",
		email: "test@nomail.com",
		age: 30,
		height: 66,
		weight: 180
	}
)