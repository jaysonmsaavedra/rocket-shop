const expect = require("chai").expect
const ReviewProcess = require("../processes/review")
const MembershipApplication = require("../models/membership_application")
const MissionControl = require("../models/mission_control")
const Mission = require("../models/mission")
const Helpers = require("./helpers")
const sinon = require("sinon")
const DB = require("../db")

describe("The Review Process", () => {
	describe("Receiving a valid application", () => {
		let decision, review, validApp = Helpers.validApplication

		before( (done) => {
			const db = new DB()
			sinon.stub(db, "getMissionByLaunchDate").yields(null, null)
			sinon.stub(db, "createNextMission").yields(null, new Mission())
			review = new ReviewProcess({application: validApp, db: db})
			sinon.spy(review, "ensureAppValid")
			sinon.spy(review, "findNextMission")
			sinon.spy(review, "roleIsAvailable")
			sinon.spy(review, "ensureRoleCompatible")
			review.processApplication( (err, result) => {
				decision = result
				done()
			})
		})

			it("returns success", () => {
			expect(decision.success, decision.message).to.be.true
		})
		it("ensures the application is valid", () => {
			expect(review.ensureAppValid.called).to.be.true
		})
		it("selects a mission", () => {
			expect(review.findNextMission.called).to.be.true
		})
		it("ensures a role exists", () => {
			expect(review.roleIsAvailable.called).to.be.true
		})
		it("ensures role compatibility", () => {
			expect(review.ensureRoleCompatible.called)
		})
	})
})