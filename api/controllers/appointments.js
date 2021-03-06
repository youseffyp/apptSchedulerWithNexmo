const Model = require('../models/index');

const { Appointment, Slot } = Model;
const Nexmo = require('nexmo');


const appointmentController = {
	all(req, res) 
	{
	// RETURNS ALL APPOINTMENTS
	Appointment.find({}).exec((err, appointments) => res.json(appointments)); 
	},
	create(req, res)
	{
		var requestBody = req.body;

		var newslot = new Slot({
			slot_time: requestBody.slot_time,
			slot_date: requestBody.slot_date,
			created_at: Date.now()
		});
	newslot.save();
	// CREATES A NEW RECORD FROM A SUBMITTED FORM
	var newappointment = new Appointment({
		name: requestBody.name,
		email: requestBody.email,
		phone: requestBody.phone,
		slots: newslot.id
	});

		const nexmo = new Nexmo({ //nexmo credentials here
		
	});

	let msg = requestBody.name + " " + "this message is to confirm your appointment at" + " " + requestBody.appointment;

	// AND SAVES THE RECORD TO THE DATABASE

	newappointment.save((err,saved) => {
		// RETURNS THE SAVED APPOINTMENT AFTER A SUCCESSFUL SAVE
		Appointment.find({id: saved._id})
				   .populate('slots')
				   .exec((err, appointment) => {
				   	res.json(appointment);
				   });	

		    const from = VIRTUAL_NUMBER;
		    const to = RECIPIENT_NUMBER;

		    nexmo.message.sendSms(from, to, msg, (err, responseData) => {
		    	if (err) 
		    		{
		    			console.log(err);
		    		} 
	    		else 
		    		{
		    			console.dir(responseData);
		    		}
		    });
		});
	}
};

module.exports = appointmentController;