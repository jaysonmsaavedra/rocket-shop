const assert = require("assert")
const MembershipApplication = require("../models/membership_application")

describe("Membership application requirements", function() {
	let validApp

	before(function() {
		validApp = new MembershipApplication({
			first: "Test",
			last: "User",
			email: "test@test.com",
			age: 30,
			height: 66,
			weight: 160
		}) 
	})

	describe("Application valid if...", function() {
		it("all validators successful", function() {
			assert(validApp.isValid(), "Not valid")
		})
	})

	describe("Application invalid if...", function() {
		it("email is 4 characters or less", function() {
			const app = new MembershipApplication({email : "dd"})
			assert(!app.emailIsValid())
		})
		it("eamil does not contain an @", function() {
			const app = new MembershipApplication({email : "testeamil.com"})
			assert(!app.emailIsValid())
		})
		it("email is omitted", function() {
			const app = new MembershipApplication()
			assert(!app.emailIsValid())
		})
		it("height is less than 60 inches", function() {
			const app = new MembershipApplication({height: 10})
			assert(!app.heightIsValid())
		})
		it("height is more than 75 inches", function() {
			const app = new MembershipApplication({height: 80})
			assert(!app.heightIsValid())
		})
		it("height is omitted", function() {
			const app = new MembershipApplication()
			assert(!app.heightIsValid())
		})
		it("age is more than 100", function() {
			const app = new MembershipApplication({age: 101})
			assert(!app.ageIsValid())
		})
		it("age is less than 15", function() {
			const app = new MembershipApplication({age: 12})
			assert(!app.ageIsValid())
		})
		it("age is omitted", function() {
			const app = new MembershipApplication()
			assert(!app.ageIsValid())
		})
		it("weight is more than 100", function() {
			const app = new MembershipApplication({weight: 50})
			assert(!app.weightIsValid())
		})
		it("weight is less than 15", function() {
			const app = new MembershipApplication({weight: 350})
			assert(!app.weightIsValid())
		})
		it("weight is omitted", function() {
			const app = new MembershipApplication()
			assert(!app.weightIsValid())
		})
		it("first name is omitted", function() {
			const app = new MembershipApplication()
			assert(!app.nameIsValid())
		})
		it("last name is omitted", function() {
			const app = new MembershipApplication()
			assert(!app.nameIsValid())
		})
	})
})