const mongoose = require('mongoose')

const  PostSchema = new mongoose.Schema(
    {
        title: {type: String,required: true},
        description: {type: String,required: true},
        selectedFile: {type: String,required: true},
        moreInfo:  [
            {
                title: {type: String},
                notes: {type: String}
            },
            {
                title: {type: String},
                notes: {type: String}
            },
            {
                title: {type: String},
                notes: {type: String}
            },
            {
                title: {type: String},
                notes: {type: String}
            },
            {
                title: {type: String},
                notes: {type: String}
            },

          
        ]
    }
    ,
    
    {timestamps: true}
)

module.exports = mongoose.model('Blog', PostSchema);