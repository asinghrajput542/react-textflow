import {Server} from 'socket.io'
import connection from './database/db.js';
import { deleteDocumentById, getDocument,getDocumentList,updateDocumentById } from './controller/document-controller.js';
import express from 'express';

const port=9000
const app = express();
connection();

const httpServer = app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
  });

const io=new Server(httpServer,{
    cors:{
        origin:"https://react-textflow.vercel.app/",
        methods:['GET','POST'],
    }
});

io.on('connection',socket=>{
    socket.on('get-document',async (documentId,name)=>{
        const documentData= await getDocument(documentId,name);
        socket.join(documentId);
        socket.emit('load-document',documentData.data);

        socket.on('send-changes',delta=>{
            socket.broadcast.to(documentId).emit('receive-changes',delta);
        console.log(delta)
    })

    socket.on('save-document',async data=>{
        await updateDocumentById(documentId,data);
    })

    })
  
});

app.get('/documents', async(req, res) => {
    try {
        const documents = await getDocumentList() ;
        res.json(documents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching documents.' });
      }
    
  });
  app.delete('/document/:id',async(req,res)=>{
    try{
        const doc=await deleteDocumentById(req.params.id);
        console.log("doc ",doc)
        if (doc){
            res.json("ok")
        }else{
            return res.status(404).json({ error: 'Document not found' });
    
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"An error occurred while deleting document"})
    }

  });


