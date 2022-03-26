import config from './config.json'

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllRestaurants = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurants?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getRestaurant = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurant?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getRestaurantSearch = async (name, state, city, zip, category, rating_high, rating_low, price, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/restaurants?Name=${name}&State=${state}&City=${city}&Zip=${zip}&Category=${category}&RatingLow=${rating_low}&RatingHigh=${rating_high}&Price=${price}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getRestaurantRecommendation = async (userName, userId, state, city, zip, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/restaurants?UserName=${userName}&UserId=${userId}&State=${state}&City=${city}&Zip=${zip}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getAllMatches,
    getAllPlayers,
    getAllRestaurants,
    getMatch,
    getPlayer,
    getRestaurant,
    getMatchSearch,
    getPlayerSearch,
    getRestaurantSearch,
    getRestaurantRecommendation
}
