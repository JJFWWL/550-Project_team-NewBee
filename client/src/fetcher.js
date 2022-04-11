import config from './config.json'


const getAllRestaurants = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurants?page=${page}&pagesize=${pagesize}`, {
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

const getUserByNameAndID = async (name, uid, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login?name=${name}&uid=${uid}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getBusinessByUserID = async (uid, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/friends/friend_business/${uid}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getUserByBusinessID = async (id, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/friends/friend_connection/${id}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getStarDistribution = async (region, name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/star_sci/${region}?name=${name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getPriceDistribution = async (region, name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/price_sci/${region}?name=${name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}



const getAverageRating = async (region, name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/avg_rating/${region}?name=${name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getAveragePrice = async (region, name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/avg_price/${region}?name=${name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getBusinessPercentage = async (region, name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/business_percentage/${region}?name=${name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getAllRestaurants,
    getRestaurant,
    getRestaurantSearch,
    getRestaurantRecommendation,
    getUserByNameAndID,
    getBusinessByUserID,
    getUserByBusinessID,
    getStarDistribution,
    getPriceDistribution,
    getAverageRating,
    getAveragePrice,
    getBusinessPercentage
}
