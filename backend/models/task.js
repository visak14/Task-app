const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'working', 'complete'],
        default: 'pending'
    },
    due_date: {
        type: Date
    },
    assigned_to: {
        type: String
    }

});

const TaskModel = mongoose.model('todos', TaskSchema);
module.exports = TaskModel;