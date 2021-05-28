const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRouter = require('./routes');

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client')));
app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Server Running on port 3000');
}).on('error', error => {
    console.log(error.message);
    process.exit(1);
});