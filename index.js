const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
const {APP_PORT} = require('./config/config')
app.use(cors());
app.use(morgan('dev'));

mongoose.connect('mongodb://127.0.0.1:27017/music_web', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongodb connected')
    })
    .catch((err) => {
        console.log('error in connecting to mongo db',err)
    })

mongoose.connection.on("error", err => {
    console.log('Mongo Connection Error', err);
});

const port = APP_PORT || process.env.PORT;

const router = require('./routes/index')

app.use('/v1/' , router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});