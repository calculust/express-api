const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');

let app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Server Running on port 3000');
}).on('error', error => {
    console.log(error.message);
    process.exit(1);
});