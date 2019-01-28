
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const TaskModel = require('./modules/task.js')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	//
});

app.get('/api/tasks', (req, res) => {
	TaskModel.find({}, (err, tasks) => {
		res.send(tasks);
	});
});

app.get('/api/tasks/:id', (req, res) => {
	TaskModel.findOne({
		_id: req.params.id
	}).then(doc => {
		res.json(doc);
	}).catch(err => {
		res.status(404).send('A task with this ID (' + req.params.id + ') was not found');	
	});
});

app.post('/api/tasks', (req,res) => {
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
});

app.put('/api/tasks/:id', (req,res) => {
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
});

app.delete('/api/task/:id', (req,res) => {
	TaskModel.findByIdAndRemove(req.params.id)
		.then(doc => {
			res.json(doc);
		}).catch(err => {
			res.status(500).json(err);	
		});
});

function validateTask(task) {
	const schema = {
		name: Joi.string().min(2).required()
	};
	const result = Joi.validate(task, schema);
	return result;
}


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port ' + port));