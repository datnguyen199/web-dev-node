'use strict';

const restify = require('restify');
const util = require('util');
const log = require('debug')('users:server');
const error = require('debug')('users:error');
const userModel = require('./users-sequelize');

var server = restify.createServer({
    name: "User-Auth-Service",
    version: "0.0.1"
});

server.use(restify.authorizationParser());
server.use(check);
server.use(restify.queryParser());
server.use(restify.bodyParser({
    mapParams: true
}));

server.post('/users', (req, res, next) => {
    userModel.create(req.params.username, req.params.password, req.params.provider, req.params.lastName,
        req.params.givenName, req.params.middleName, req.params.emails, req.params.photos)
    .then(result => {
        res.send(result);
        next(false);
    })
    .catch(error => { res.send(500, error); error(error.stack); next(false); })
})

server.post('/users/:username', (req, res, next) => {
    usersModel.update(req.params.username, req.params.password, req.params.provider, req.params.lastName,
        req.params.givenName, req.params.middleName, req.params.emails, req.params.photos)
    .then(result => {
        log(`updated ${util.inspect(result)}`);
        next(false);
    })
    .catch(err => { res.send(500, err); error(err.stack); next(false); })
})

server.post('/find-or-create', (req, res, next) => {
    userModel.findOrCreate({
        id: req.params.username, username: req.params.username, password: req.params.password,
        provider: req.params.provider, familyName: req.params.familyName,
        givenName: req.params.givenName,middleName: req.params.middleName,
        emails: req.params.emails, photos: req.params.photos
    })
    .then(result => {
        res.send(result);
        next(false);
    })
    .catch(err => { res.send(500, err); error(err.stack); next(false); })
})

server.get('/users/:username', (req, res, next) => {
    userModel.find(req.params.username).then(user => {
        if(!user) {
            res.send(404, new Error('Cannot find ' + req.params.username));
        } else {
            res.send(user);
        }
        next(false);
    })
    .catch(err => { res.send(500, err); error(err.stack); next(false); })
})

server.del('/destroy/:username', (req, res, next) => {
    usersModel.destroy(req.params.username)
    .then(() => { res.send({}); next(false); })
    .catch(err => { res.send(500, err); error(err.stack); next(false); });
});

server.post('/passwordCheck', (req, res, next) => {
    usersModel.userPasswordCheck(req.params.username, req.params.password)
    .then(check => { res.send(check); next(false); })
    .catch(err => { res.send(500, err); error(err.stack); next(false); });
});

server.get('/list', (req, res, next) => {
    usersModel.listUsers().then(userlist => {
        if (!userlist) userlist = [];
        res.send(userlist);
        next(false);
    })
    .catch(err => { res.send(500, err); error(err.stack); next(false); });
});

server.listen(process.env.PORT, "localhost", function() {
    log(server.name + ' listening at ' + server.url);
})

var apiKeys = [ {
    user: 'them',
    key: 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF'
} ]

function check(req, res, next) {
    if(req.authorization) {
        var found = false;
        for(let auth of apiKeys) {
            if(auth.key === req.authorization.basic.password && auth.user === req.authorization.basic.username) {
                found = true;
                break;
            }
        }
        if (found) next();
        else {
            res.send(401, new Error("Not authenticated"));
            error('Failed authentication check ' + util.inspect(req.authorization));
            next(false);
        }
    } else {
        res.send(500, new Error('No Authorization Key'));
        error('NO AUTHORIZATION');
        next(false);
    }
}
