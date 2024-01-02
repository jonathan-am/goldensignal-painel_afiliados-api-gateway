const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();
var options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/certificate.crt'),
};
const bodyParser = require('body-parser');
const RequestPlataformList = require('./request/RequestPlataformList');
const RequestGameList = require('./request/RequestGameList');
const RequestCreateOrUpdatePlataform = require('./request/RequestCreateOrUpdatePlataform');
const RequestCreateOrUpdateGame = require('./request/RequestCreateOrUpdateGame');
const RequestLoginSession = require('./request/RequestLoginSession');
const RequestDeleteGame = require('./request/RequestDeleteGame');
const RequestDeletePlataform = require('./request/RequestDeletePlataform');
const RequestUpdateConfiguration = require('./request/RequestUpdateConfiguration');
const RequestPageConfiguration = require('./request/RequestPageConfiguration');
const RequestCreateUser = require('./request/RequestCreateUser');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(cors());

app.post('/v1/user', async (req, res)=> {
    await RequestCreateUser(req, res);
})

app.post('/v1/login', async (req, res) => {
    await RequestLoginSession(req, res);
});

app.get('/v1/configuration', async (req, res) => {
    await axios.get(`http://localhost:5555/v1/sessions/${req.headers.sessionid}`).then(response => {
        if (response.data.affiliateId === req.headers.affiliateid) {
            RequestPageConfiguration(req, res);
        } else {
            res.status(400).send({ status: 400, message: "invalid request" })
        }
    }).catch(error => {
        console.log(error);
        res.status(400).send({ status: 400, message: "invalid request" })
    });
});

app.post('/v1/configuration', async (req, res) => {
    await axios.get(`http://localhost:5555/v1/sessions/${req.headers.sessionid}`).then(response => {
        if (response.data.affiliateId === req.headers.affiliateid) {
            RequestUpdateConfiguration(req, res);
        } else {
            res.status(400).send({ status: 400, message: "invalid request" })
        }
    }).catch(error => {
        console.log(error);
        res.status(400).send({ status: 400, message: "invalid request" })
    });
});

app.post('/v1/plataforms/delete', async (req, res) => {
    await axios.get(`http://localhost:5555/v1/sessions/${req.headers.sessionid}`).then(response => {
        if (response.data.affiliateId === req.headers.affiliateid) {
            RequestDeletePlataform(req, res);
        } else {
            res.status(400).send({ status: 400, message: "invalid request" })
        }
    }).catch(error => {
        console.log(error);
        res.status(400).send({ status: 400, message: "invalid request" })
    });
});

app.post('/v1/games/delete', async (req, res) => {
    await axios.get(`http://localhost:5555/v1/sessions/${req.headers.sessionid}`).then(response => {
        if (response.data.affiliateId === req.headers.affiliateid) {
            RequestDeleteGame(req, res);
        } else {
            res.status(400).send({ status: 400, message: "invalid request" })
        }
    }).catch(error => {
        res.status(400).send({ status: 400, message: "invalid request" })
    });
});

app.post('/v1/plataforms', async (req, res) => {
    await axios.get(`http://localhost:5555/v1/sessions/${req.headers.sessionid}`).then(response => {
        if (response.data.affiliateId === req.headers.affiliateid) {
            RequestCreateOrUpdatePlataform(req, res);
        } else {
            res.status(400).send({ status: 400, message: "invalid request" })
        }
    }).catch(error => {
        console.log(error);
        res.status(400).send({ status: 400, message: "invalid request" })
    });
});

app.post('/v1/games', async (req, res) => {
    await axios.get(`http://localhost:5555/v1/sessions/${req.headers.sessionid}`).then(response => {
        if (response.data.affiliateId === req.headers.affiliateid) {
            RequestCreateOrUpdateGame(req, res);
        } else {
            res.status(400).send({ status: 400, message: "invalid request" })
        }
    }).catch(error => {
        res.status(400).send({ status: 400, message: "invalid request" })
    });
});

app.get('/v1/plataforms', async (req, res) => {
    await axios.get(`http://localhost:5555/v1/sessions/${req.headers.sessionid}`).then(response => {
        if (response.data.affiliateId === req.headers.affiliateid) {
            RequestPlataformList(req, res);
        } else {
            res.status(400).send({ status: 400, message: "invalid request" })
        }
    }).catch(error => {
        res.status(400).send({ status: 400, message: "invalid request" })
    });
});

app.get('/v1/games', async (req, res) => {
    await axios.get(`http://localhost:5555/v1/sessions/${req.headers.sessionid}`).then(response => {
        if (response.data.affiliateId === req.headers.affiliateid) {
            RequestGameList(req, res);
        } else {
            res.status(400).send({ status: 400, message: "invalid request" })
        }
    }).catch(error => {
        res.status(400).send({ status: 400, message: "invalid request" })
    });
});

app.post('/v1/afiliado', async (req, res)=> {
    await axios.post(`http://localhost:5555/afiliado`, req.body).then( async response=> {
        res.status(200).send(response.data);
    }).catch(error => {
        console.log(error);
        res.status(error.response.status).send(error.response.data);
    })
});

app.put('/v1/afiliado', async (req, res)=> {
    await axios.put(`http://localhost:5555/afiliado`, req.body).then(response=> {
        res.status(200).send(response.data);
    }).catch(error => {
        console.log(error);
        res.status(error.response.status).send(error.response.data);
    })
});

app.get('/v1/afiliado/:affiliateId', async (req, res)=> {
    await axios.get(`http://localhost:5555/afiliado/${req.params.affiliateId}`).then(response=> {
        res.status(200).send(response.data);
    }).catch(error => {
        console.log(error);
        res.status(error.response.status).send(error.response.data);
    })
});

var server = https.createServer(options, app).listen(5503, function () {
    console.log("Express https server listening on port " + 5503);
});
app.listen(5504, () => { console.log('Listening http into port 5504') });