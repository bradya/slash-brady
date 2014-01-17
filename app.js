var express = require("express");
var request = require('request');
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use(express.bodyParser());

app.post('/:id/:secret', function(req, res) {
  var token = null;

  if (process.env.slack_token === process.env.slack_token + '') {
    // Token is specified and is string
    token = process.env.slack_token;
  }
  else {
    res.send('Failed: no token specified in environment variables');
    return;
  }

  if (req.params.id === req.params.id + '') {
    // File id is specified and is string
    var fileId = req.params.id;
    var secret = req.params.secret;

    if (process.env.slack_secret === process.env.slack_secret + '') {
      // If secret is specified in environment variables, validate it
      var isSecretValid = process.env.slack_secret === secret;
      if (!isSecretValid) {
        return;
      }
    }

    var url = 'https://slack.com/api/files.info?token=' + token + '&file=' + fileId;

    request.get({ url: url, json: true },
      function (error, response, result) {
        if (!error && response.statusCode == 200) {
          var content = result.content;

          content = content + '\n' + req.body.text;

          var postUrl = 'https://slack.com/api/files.edit';

          request.post({ url: postUrl, json: true, form: {token: token, file: fileId, content: content} },
            function (error, response, result) {
              if (!error && response.statusCode == 200) {
                res.send('Success');
              }
              else {
                res.send('Error: ' + error);
              }
          });
        }
    });
  }
  else {
    res.send('Failed: no file id in URL');
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
