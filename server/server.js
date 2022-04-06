const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passsport-setup');

const routes = require('./routes')
const config = require('./config.json')


const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
//2.1 user login
app.get('/login', routes.login)
// 2.2 
app.get('/friends/friend_business/:userid', routes.friend_business)
// 2.3
app.get('/friends/friend_connection/:id', routes.friend_connection)

// 3.1
app.get('/star_sci/:choice', routes.star_sci)
// 3.2
app.get('/price_sci/:choice', routes.price_sci)
// 3.3
app.get('/avg_sci/:choice', routes.avg_sci)
// 3.4
app.get('/cat_map/:choice', routes.cat_map)

//cookie-session
app.use(cookieSession({
    name: '550project-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }

    //initilize passport
    app.use(passport.initialize());
    app.use(passport.session());

    //oauth2.0-google
    app.get('/auth/google',
        passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
        ));

    //oauth2.0-google
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure'
        }));

    //oath failed
    app.get('/auth/google/failure', (req, res) => {
        res.send('Google Authentication failed');
    });

    //oauth google success
    app.get('/auth/google/success', isLoggedIn, (req, res) => {
        res.send('Google Authentication success.\n')
    });

    //logout
    app.get('/logout', (req, res) => {
        req.session = null;
        req.logout();
        res.send('Logout success');
        res.redirect('/');
    });


    app.listen(config.server_port, () => {
        console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
    });

    module.exports = app;
}
