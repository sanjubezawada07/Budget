const express =require('express')
const cors=require('cors');
const app=express();
const { db } =require('./db/db');
const {readdirSync}=require('fs')

require('dotenv').config()
const PORT=process.env.PORT 

app.use(express.json());
app.use(cors())
//routers
readdirSync('./routes').map((route) => app.use('/api/v1',require('./routes/'+route)))



const server=()=>{
    try {
        db(); // Wait for the database connection
        app.listen(PORT, () => {
            console.log('Server is listening on port:', PORT);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}
server()