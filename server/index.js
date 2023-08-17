import {Server} from 'socket.io'
// import express from 'express'
import connection from './database/db.js';
import { getDocument,getDocumentList,updateDocumentById } from './controller/document-controller.js';
import express from 'express';
import Document from "./schema/documentSchema.js";

const port=9000
const app = express();
connection();

const httpServer = app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
  });

const io=new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST'],
    }
});

io.on('connection',socket=>{
    socket.on('get-document',async documentId=>{
        const documentData= await getDocument(documentId);
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


