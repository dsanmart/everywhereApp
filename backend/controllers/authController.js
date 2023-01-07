const pool = require('../db');
const bcrypt = require('bcrypt');

module.exports.handleLogin = async (req, res) => {
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user.username });
    } else {
        res.json({ loggedIn: false });
    }
};

module.exports.attemptLogin = async (req, res) => {
    const potentialLogin = await pool.query("SELECT id, username, pass FROM users u WHERE u.username = $1", [req.body.username]); // <-- SQL query

    if (potentialLogin.rows.length > 0) {
        // Found a user with the username
        const isSamePassword = await bcrypt.compare( // <-- Compare the password with the hashed password
            req.body.password, 
            potentialLogin.rows[0].pass
            );
    
        if (isSamePassword) {
            // login the user
            req.session.user = {
                id: potentialLogin.rows[0].id,
                username: potentialLogin.rows[0].username,
            };
            res.json({loggedIn: true, username: req.body.username});
            console.log("User logged in");
        } else {
            // don't login
            console.log("Not logged in");
            res.json({ loggedIn: false, status: "Wrong username or password" });
        }
    } else {
        // No user with the username
        console.log("Not logged in");

        res.json({ loggedIn: false, status: "Wrong username or password" });
    }
};

module.exports.attemptSignUp = async (req, res) => {
    // Look for a user with the same username
    const existingUser = await pool.query(
        "SELECT username FROM users WHERE username = $1",
        [req.body.username] // The username to look for
    );

    // If there has been 0 usernames found, then the username is available
    if (existingUser.rows.length === 0) {
        //register user
        console.log("Registering user");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query("INSERT INTO users (username, pass) VALUES ($1, $2) RETURNING *", [req.body.username, hashedPassword]);
        // store user id in session cookie
        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id
        };
        res.json({ loggedIn: true, username: req.body.username  }); // Send the user object back to the client
    } else {
        res.json({ loggedIn: false, message: "Username already exists" });
    }
};