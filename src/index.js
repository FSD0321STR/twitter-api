const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();
const port = 8080;


const AuthRouter = require('./controllers/AuthRouter');

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(AuthRouter);

app.listen(port, () => console.log(`Runing in http://localhost:${port}`));

