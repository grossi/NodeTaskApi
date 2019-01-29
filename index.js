const Joi = require('joi');
const express = require('express');
const task = require('./routes/task.js');

const app = express();

app.use(express.json());

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