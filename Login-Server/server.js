// imports
const express = require("express")
var CONFIG = require('./config.json');

var app = express();

// Gets Acess token for user
app.get('/spotifylogin', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
  URLSearchParams({
      response_type: 'code',
      client_id: CONFIG.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: CONFIG.spotify_redirect_uri,
      state: state
    }));
});
// Gets Main Token and refrece Token
app.get('/spotifycallback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
  }
});

// Refresh 
app.get('/spotify_refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer.form(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// start login server on :8888
var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});