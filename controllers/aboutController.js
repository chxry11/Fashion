const db = require('../db');
exports.aboutUs = (req, res) => {
    let loggedIn = req.session.user ? true : false;
    res.render('about', { loggedIn });
};
