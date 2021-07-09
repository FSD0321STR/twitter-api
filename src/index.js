const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();
const port = process.env.PORT || '8080';
//const port = 8080;


const AuthRouter = require('./controllers/AuthRouter');
const TweetRouter = require('./controllers/TweetRouter');

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(AuthRouter);
app.use('/Tweet', TweetRouter);

app.listen(port, () => console.log(`Runing in http://localhost:${port}`));

