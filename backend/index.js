const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./models/db.js');
const AuthRouter = require('./routes/AuthRouter.js');
const TaskRouter = require('./routes/TaskRouter.js');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
      res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);

app.use('/tasks', TaskRouter)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);

});