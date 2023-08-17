import Document from "../schema/documentSchema.js";


export const getDocument=async (id)=>{
    if(id===null) return;

    const document=await Document.findById(id);

    if(document) return document;
     return await Document.create({_id:id, data:"",creationDate:new Date(),modificationDate:new Date()})

}

export const updateDocumentById=async(id,data)=>{
    return await Document.findByIdAndUpdate(id,{data:data},{modificationDate:new Date()});
}

export const getDocumentList= async ()=>{
    return await Document.find().sort({ modificationDate: 1 }).select('_id modificationDate creationDate name');
}