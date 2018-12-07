const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/view/index.html')));

app.listen(port, () => console.log(`app listening on port ${port}!`));