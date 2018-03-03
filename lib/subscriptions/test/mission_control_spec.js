const moment = require("moment")
const MissionControl = require("../models/mission_control")
const Mission = require("../models/mission")
const expect = require("chai").expect
const Helpers = require("./helpers")
const sinon = require("sinon")
const DB = require("../db")

describe("Mission Planning", () => {
	let missionControl, db
	before( () => {
		db = new DB()
		sinon.stub(db, "getMissionByLaunchDate").yields(null, null)
		sinon.stub(db, "createNextMission").yields(null, new Mission())
		missionControl = new MissionControl({db: db})
	})

	describe("No Current Mission", () => {
		let currentMission
		before( (done) => {
			missionControl.currentMission( (err, result) => {
				currentMission = result
				done()
			})
		})
		it("is created if none exist", () => {
			expect(currentMission).to.exist
			expect(db.getMissionByLaunchDate.called).to.be.true
		})
	})
	describe("Current Mission Exists", () => {
		let currentMission
		before( (done) => {
			db.getMissionByLaunchDate.restore()
			sinon.stub(db, "getMissionByLaunchDate").yields(null, {id: 1000})
			missionControl.currentMission( (err, result) => {
				currentMission = result
				done()
			})
		})
		it("it returns mission 1000", () => {
			expect(currentMission).to.exist
			expect(db.getMissionByLaunchDate.called).to.be.true
		})
	})
})