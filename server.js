const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

app.use(fileUpload());
app.use(morgan('dev'));

const router = require('./routes/uploadCSV.routes');

router(app);

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB connection ERROR: ', err));

app.listen(process.env.PORT, () => console.log('Server running'));