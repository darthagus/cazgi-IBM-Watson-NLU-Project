const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const {
        IamAuthenticator
    } = require('ibm-watson/auth');

    const naturalLanguageUnderstandig = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstandig;
}


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    const url = req.query.url;
    if (req.query.url) {
        getNLUInstance().analyze({
                'url': url,
                'features': {
                    'keywords': {
                        'emotion': true,
                        'sentiment': false,
                        'limit': 2,
                    }
                }
            })
            .then(analysisResults => {
                return res.send(analysisResults);
            })
            .catch(err => {
                console.log('error', err);
            });
    };

});

app.get("/url/sentiment", (req, res) => {
    const url = req.query.url;
    if (req.query.url) {
        getNLUInstance().analyze({
                'url': url,
                'features': {
                    'entities': {
                        'emotion': false,
                        'sentiment': true,
                        'limit': 2,
                    }
                }
            })
            .then(analysisResults => {
                return res.send(analysisResults);
            })
            .catch(err => {
                console.log('error', err);
            });
    };

});

app.get("/text/emotion", (req, res) => {
    const text = req.query.text;
    if (req.query.text) {
        getNLUInstance().analyze({
                'text': text,
                'features': {
                    'keywords': {
                        'emotion': true,
                        'sentiment': false,
                        'limit': 2,
                    }
                }
            })
            .then(analysisResults => {
                return res.send(analysisResults);
            })
            .catch(err => {
                console.log('error', err);
            });
    };

});

app.get("/text/sentiment", (req, res) => {
    const text = req.query.text;
    if (req.query.text) {
        getNLUInstance().analyze({
                'text': text,
                'features': {
                    'keywords': {
                        'sentiment': true,
                        'limit': 2,
                    }
                }
            })
            .then(analysisResults => {
                return res.send(analysisResults);
            })
            .catch(err => {
                console.log('error', err);
            });
    };

});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})