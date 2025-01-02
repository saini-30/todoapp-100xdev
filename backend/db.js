const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://harpreet:saini@cluster0.fiymd.mongodb.net/');
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});
const todo = mongoose.model('Todo', todoSchema);

module.exports = {
    todo 

};