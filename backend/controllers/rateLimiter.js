// This file contains the rate limiter middleware that is used before expensive middleware functions to prevent the server from being overloaded by requests from a single IP address.

const redisClient = require('../redis');

module.exports.rateLimiter = (secondsLimit, limitAmount) => async (req, res, next) => {
    const ip = req.connection.remoteAddress; // Get the IP address of the client
    const [response] = await redisClient
        .multi()
        .incr(ip)
        .expire(ip, secondsLimit)
        .exec(); // Increment the IP address in Redis and set the expiration to 'secondsLimit' seconds
    if (response[1] > limitAmount) // If there is more than 'limitAmount' requests in the last 'secondsLimit' seconds
    res.json({
        loggedIn: false, 
        status: "Too many requests! Try again in a minute."
    }); 
    else next();
  
}
