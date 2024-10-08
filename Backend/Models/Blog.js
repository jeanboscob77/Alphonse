const mongoose = require('mongoose')

const  PostSchema = new mongoose.Schema(
    {
        title: {type: String,required: true},
        description: {type: String,required: true},
        selectedFile: {type: String,required: true},
    }
    ,
    {timestamps: true}
)

module.exports = mongoose.model('Blog', PostSchema);