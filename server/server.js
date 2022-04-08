const express = require('express');
const mysql = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

//1.1 A business search
app.get('/search/businesses', routes.search_businesses)

//1.1B & 1.2B select a business
app.get('/business', routes.business)

//1.2 A business recommender
app.get('/recommend/businesses', routes.recommend_businesses)

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

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
