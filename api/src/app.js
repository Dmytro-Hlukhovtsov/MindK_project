const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.post('/users', (req, res) => {
    res.send('Hello from users');
});
app.listen(process.env.APP_PORT);
