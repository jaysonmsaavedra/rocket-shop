const expect = require("chai").expect
const assert = require("chai").assert
const MembershipApplication = require("../models/membership_application")
const moment = require("moment")
const Helpers = require("./helpers")

describe("Membership application requirements", () => {
	let validApp

	before(() => {
		validApp = Helpers.validApplication
	})

	describe("Application valid if...", () => {
		it("all validators successful", () => {
			expect(validApp.isValid(), "Not valid").to.be.true
		})
	})

	describe("Application invalid if...", () => {
		it("is past the validUntil date", () => {
			const app = new MembershipApplication({validUntil: Date.parse("01/01/2010")})
			expect(app.expired()).to.be.true
		})
		it("email is 4 characters or less", () => {
			const app = new MembershipApplication({email : "dd"})
			expect(app.email).to.have.lengthOf.below(4)
		})
		it("eamil does not contain an @", () => {
			const app = new MembershipApplication({email : "testeamil.com"})
			expect(app.email).to.not.have.string("@")
		})
		it("email is omitted", () => {
			const app = new MembershipApplication()
			expect(app.email).to.not.be.null
		})
		it("height is less than 60 inches", () => {
			const app = new MembershipApplication({height: 10})
			expect(app.height).to.be.below(60)
		})
		it("height is more than 75 inches", () => {
			const app = new MembershipApplication({height: 80})
			expect(app.height).to.be.above(75)
		})
		it("height is omitted", () => {
			const app = new MembershipApplication()
			expect(app.height).to.not.be.null
		})
		it("age is more than 100", () => {
			const app = new MembershipApplication({age: 101})
			expect(app.age).to.be.above(100)
		})
		it("age is less than 15",() => {
			const app = new MembershipApplication({age: 12})
			expect(app.age).to.be.below(15)
		})
		it("age is omitted", () => {
			const app = new MembershipApplication()
			expect(app.age).to.not.be.null
		})
		it("weight is more than 100", () => {
			const app = new MembershipApplication({weight: 151})
			expect(app.weight).to.be.above(100)
		})
		it("weight is less than 300", () => {
			const app = new MembershipApplication({weight: 250})
			expect(app.weight).to.be.below(300)
		})
		it("weight is omitted", () => {
			const app = new MembershipApplication()
			expect(app.weight).to.not.be.null
		})
		it("first name is omitted", () => {
			const app = new MembershipApplication()
			expect(app.name).to.not.be.null
		})
		it("last name is omitted", () => {
			const app = new MembershipApplication()
			expect(app.name).to.not.be.null
		})
	})
})