
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let tasks = [
	{ 
		id:1,
		name: 'Task 1'
	},
	{ 
		id:2,
		name: 'Task 2'
	},
	{ 
		id:1,
		name: 'Task 3'
	},
];

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/tasks', (req, res) => {
	res.send(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
	const task = tasks.find(c => c.id == parseInt(req.params.id));
	if (!task) {
		res.status(404).send('A task with this ID (' + req.params.id + ') was not found');	
		return;
	} 
	res.send(task);
});

app.post('/api/tasks', (req,res) => {
	const schema = {
		name: Joi.string().min(2).required()
	};
	const { error } = validateTask(req.body);

	if(error) {
		res.status(400).send(error.details[0].message);
		return;
	}

    const task = {
    	id: tasks.length + 1,
    	name: req.body.name
    };
    tasks.push(task);
    res.send(task);
});

app.put('/api/tasks/:id', (req,res) => {
	const task = tasks.find(c => c.id == parseInt(req.params.id));
	if (!task) {
		res.status(404).send('A task with this ID (' + req.params.id + ') was not found');
		return;
	}

	const { error } = validateTask(req.body);

	if(error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	task.name = req.body.name;
	res.send(task);
    
});

app.delete('/api/task/:id', (req,res) => {
	const task = tasks.find(c => c.id == parseInt(req.params.id));
	if (!task) {
		res.status(404).send('A task with this ID (' + req.params.id + ') was not found');
		return;
	}

	const index = tasks.indexOf(task);
	tasks.splice(index, 1);

	res.send(task);
    
});

function validateTask(task) {
	const schema = {
		name: Joi.string().min(2).required()
	};
	const result = Joi.validate(task, schema);
	return result;
}


const port = process.env.PORT || 3000

app.listen(port, () => console.log('Listening on port ' + port));