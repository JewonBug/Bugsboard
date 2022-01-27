const mongoose = require("mongoose");


const boardSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type: String,
        required : true,
        unique : true,
    },
    date : {
        type:Date, 
        required : true,
    },
});

module.exports = mongoose.model("board", boardSchema);