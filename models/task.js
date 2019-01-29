const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;

let TaskSchema = new mongoose.Schema({
	name: String,
	completed: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);