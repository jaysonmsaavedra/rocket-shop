const async = require("async")
const expect = require("chai").expect
const MissionControl = require("../models/mission_control")

const ReviewProcess = function(args) {
	expect(args.application, "Need to send in an application").to.exist
	expect(args.db, "Need a database instance").to.exist
	const db = args.db
	const app = args.application
	const missionControl = new MissionControl({
		db: db
	})

	this.ensureAppValid = (next) => {
		if(app.isValid()) {
			next(null, true)
		} else {
			next(app.validationMessage(), null)
		}
	}

	this.findNextMission = (next) => {
		 const mission = {
			commander: null,
			pilot: null,
			MAVPilot: null,
			passengers: []
		}
		next(null, mission)
	}

	this.roleIsAvailable = (next) => {
		next(null, true)
	}

	this.ensureRoleCompatible = (next) => {
		next(null, true)
	}

	this.approveApplication = (next) => {
		next(null, true)
	}	

	this.processApplication = (next) => {
		async.series({
				validated: this.ensureAppValid,
				mission: this.findNextMission,
				roleAvailable: this.roleIsAvailable,
				roleCompatible: this.ensureRoleCompatible,
				success: this.approveApplication
			}, (err, result) => {
				if(err) {
					next(null, {
						success: false,
						message: err
					})
				} else {
					result.message = "Welcome to Mars"
					console.log(result)
					next(null, result)
				}
			})
	}
}

module.exports = ReviewProcess