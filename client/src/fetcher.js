import config from './config.json'


const getAllRestaurants = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurants?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getRestaurant = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/business?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}


const getRestaurantSearch = async (name, state, city, zip, category, rating_high, rating_low, price, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/businesses?Name=${name}&State=${state}&City=${city}&Zip=${zip}&Category=${category}&RatingLow=${rating_low}&RatingHigh=${rating_high}&Price=${price}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getRestaurantRecommendation = async (userName, userId, state, city, zip, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/recommend/businesses?UserName=${userName}&UserId=${userId}&State=${state}&City=${city}&Zip=${zip}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getUserByNameAndID = async (name, userid, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login?Name=${name}&UserId=${userid}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getBusinessByUserID = async (userid, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/friends/friend_business/${userid}?page=${page}&pagesize=${pagesize}`, {
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

const getStarDistributionByState = async (state, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/star_sci/${state}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getStarDistributionByCity = async (city, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/star_sci/${city}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getStarDistributionByZip = async (zip, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/star_sci/${zip}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPriceDistributionByState = async (state, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/price_sci/${state}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPriceDistributionByCity = async (city, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/price_sci/${city}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPriceDistributionByZip = async (zip, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/price_sci/${zip}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAverageRatingByState = async (state, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/avg_rating/${state}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAverageRatingByCity = async (city, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/avg_rating/${city}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAverageRatingByZip = async (zip, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/avg_rating/${zip}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAveragePriceByState = async (state, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/avg_price/${state}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAveragePriceByCity = async (city, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/avg_price/${city}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAveragePriceByZip = async (zip, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/avg_price/${zip}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getBusinessPercentageByState = async (state, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/business_percentage/${state}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getBusinessPercentageByCity = async (city, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/business_percentage/${city}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getBusinessPercentageByZip = async (zip, page, pagesize) => {
    var res = fetch(`http://${config.server_host}:${config.server_port}/business_percentage/${zip}?page=${page}&pagesize=${pagesize}`, {
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
    getStarDistributionByState,
    getStarDistributionByCity,
    getStarDistributionByZip,
    getPriceDistributionByState,
    getPriceDistributionByCity,
    getPriceDistributionByZip,
    getAverageRatingByState,
    getAverageRatingByCity,
    getAverageRatingByZip,
    getAveragePriceByState,
    getAveragePriceByCity,
    getAveragePriceByZip,
    getBusinessPercentageByState,
    getBusinessPercentageByCity,
    getBusinessPercentageByZip
}
