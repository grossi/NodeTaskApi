const Joi = require('joi');
const express = require('express');
const task = require('./routes/task.js');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.get('/', (req, res) => {
	res.json({message: "Welcome to Task API"});
});

app.route("/api/tasks")
	.get(task.getTasks)
	.post(task.postTask);

app.route("/api/tasks/:id")
	.get(task.getTask)
	.put(task.updateTask)
	.delete(task.deleteTask);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port ' + port));

module.exports = app;