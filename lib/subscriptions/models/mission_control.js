const moment = require("moment")
const expect = require("chai").expect
const Mission = require("../models/mission")

let MissionControl = function(args) {
	expect(args.db, "Need a DB instance").to.exist
	this.db = args.db
}

MissionControl.prototype.currentMission = function(next) {
	const nextMission = moment().add(1, "month").startOf("month")
	const formattedMissionDate = nextMission.format("MM-DD-YYYY")
	const self = this

	this.db.getMissionByLaunchDate(formattedMissionDate, (err, foundMission) => {
		expect(err === null, err).to.be.ok

		if(foundMission) {
			next(null, new Mission(foundMission))
		} else {
			foundMission = new Mission()
			self.db.createNextMission(foundMission, (err, result) => {
				next(err, foundMission)
			})
		}
	})
}

MissionControl.prototype.hasSpaceForrole = function(role, next) {
	this.currentMission( (err, mission) => {
		const hasRoom = mission.needsRole(role)
		next(null, hasRoom)
	})
}

module.exports = MissionControl