slash-brady
===========

Slash command in Slack which adds a line of text to a user specified file (e.g. /brady add custom emoji! adds 'add custom emoji!' to my todo list)

## Requirements

* Node.js
* Slack API token (and a Slack account)
* A secret password to use only for this integration (e.g. md5 hash of your father's maiden name)
* A heroku account and the heroku command line utility installed
* File id for a snippet on Slack (open the snippet in your browser -- you should see a file id in the url, it will look similar to 'F02554SF8')
* 5 minutes of your time

## Guide

1. Clone source 'git clone https://github.com/bradya/slash-brady.git'
2. Install node dependencies 'npm install'
3. Initialize git repo 'git init; git add .; git commit -m "init"'
4. Create heroku app 'heroku create' and remember this subdomain!
5. Push to heroku 'git push heroku master'
6. Make sure at least 1 dyno is running 'heroku ps:scale web=1'
7. Add a new slash command to slack at https://my.slack.com/services/new/slash-commands with your url constructed like below
8. Add two config variables to your heroku app 'heroku config:add slack_token=API-TOKEN' and 'heroku config:add slack_secret=SECRET-PASSWORD' replacing API-TOKEN and SECRET-PASSWORD with applicable values.
9. Anyone on your team can now type in your slash command in Slack and it should work! Ping me on Twitter if you run into any issues @bradyy

### URL construction

`
http://yourappsubdomain.herokuapp.com/FILE-ID/SECRET-PASSWORD
`

In the end, it should look like this:

`
http://slackslashcommand.herokuapp.com/F02554SF8/1bf984e94f0a31773aaaacd293e01fdd
`
