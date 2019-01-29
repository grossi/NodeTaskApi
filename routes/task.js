const Joi = require('joi');
const TaskModel = require('../models/task.js')


function getTasks(req, res) {
	TaskModel.find({}, (err, tasks) => {
		res.send(tasks);
	});
}

function getTask(req, res) {
	TaskModel.findOne({
		_id: req.params.id
	}).then(doc => {
		res.json(doc);
	}).catch(err => {
		res.status(404).send('A task with this ID (' + req.params.id + ') was not found');	
	});
}

function postTask(req,res) {
	const { error } = validateTask(req.body);
	if(error) {
		res.status(400).send(error.details[0].message);
		return;
	}
    const task = {
    	name: req.body.name,
    	completed: false
    };
    let model = new TaskModel(task);
    model.save()
    	.then(doc => {
    		if(!doc || doc.length === 0 ) {
    			return res.status(500).send(doc);
    		}
    		res.status(201).send(doc);
    	})
    	.catch(err =>{
    		res.status(500).json(err);
    	});
}

function updateTask(req,res) {
	const { error } = validateTask(req.body);
	if(error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	TaskModel.findOneAndUpdate({
		_id: req.params.id
	}, req.body, {
		new: true
	}).then(doc => {
		res.json(doc);
	}).catch(err => {
		res.status(500).json(err);	
	});
}

function deleteTask(req,res) {
	TaskModel.findByIdAndRemove(req.params.id)
		.then(doc => {
			res.json(doc);
		}).catch(err => {
			res.status(500).json(err);	
		});
}

function validateTask(task) {
	const schema = {
		name: Joi.string().min(2).required()
	};
	const result = Joi.validate(task, schema);
	return result;
}

module.exports = { getTask, getTasks, postTask, updateTask, deleteTask };