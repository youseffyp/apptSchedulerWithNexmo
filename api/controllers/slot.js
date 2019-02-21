const Model = require('../models/index');
const {Appointment, Slot} = Model;

const slotController = {
	all (req, res) 
	{
		// RETURNS ALL SLOTS
		Slot.find({})
			.exec((err,slots) => res.json(slots))
	}
};

module.exports = slotController;