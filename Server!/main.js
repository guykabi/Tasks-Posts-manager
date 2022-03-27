const usersRouter = require('./Routers/usersRouter') 
const express = require('express') 
const cors = require('cors') 

const app = express() 
app.use(cors()); 

app.use(express.json()); 
require('./Configs/database') 

app.use('/api/users', usersRouter);

app.listen(8000);