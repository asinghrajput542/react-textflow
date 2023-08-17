import mongoose from "mongoose";

const documentSchema= mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:false
    }
    ,
    data:{
        type:Object,
        required:true
    },
    creationDate:{
        type:Date,
        required:true,
    },
    modificationDate:{
        type:Date,
        required:true,
    }
});

const document=mongoose.model('document',documentSchema);
export default document;