const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const abTesting = require('./abTesting');
const logging = require('./logging');
const port = 3000;

nunjucks.configure(path.join(__dirname, '/view'), {
    autoescape: true,
    express: app
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());

app.get('/', abTesting(), (req, res) => {
    res.render('index.html', {
        chosenVariant: res.abVariant
    })
});

app.get('/login', logging.recordLogin(), (req, res) => {
    res.render('loggedIn.html', {
        email: req.query.email,
        variant: req.query.variant,
        results: JSON.stringify(res.testResults)
    });
});

app.get('/clear', (req, res, next) => {
    res.clearCookie('blinkist_cookie')
    res.redirect('/');
});

app.listen(port, () => console.log(`app listening on port ${port}!`));