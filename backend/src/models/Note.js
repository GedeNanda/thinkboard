import mongoose, { mongo } from "mongoose";

// 1- create a schema
// 2- model based off of that scema 

const noteSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
        },
        content: {
            type : String, 
            required : true, 
        },
    },
    {timestamps: true} //createdAt, updateAt
)

const Note = mongoose.model("Note", noteSchema);

export default Note