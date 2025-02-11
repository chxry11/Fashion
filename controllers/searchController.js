const db = require("../db");
exports.search = (req, res) => {
    let searchQuery = req.query.q;
    if (!searchQuery) {
        req.flash("error", "Search query cannot be empty.");
        return res.redirect("/");
    }

    searchQuery = `%${searchQuery}%`; 

    const sql = `SELECT * FROM Products WHERE productName LIKE ? OR productDescription LIKE ?`;

    db.query(sql, [searchQuery, searchQuery], (err, results) => {
        if (err) {
            console.error("Database search error:", err);
            req.flash("error", "An error occurred while searching.");
            return res.redirect("/");
        }

        if (results.length === 0) {
            req.flash("error", "No results found.");
            return res.redirect("/");
        }

        results = results.map(product => ({
            ...product,
            price: Number(product.price) || 0 
        }));

        res.render("search", { 
            products: results, 
            query: req.query.q, 
            messages: req.flash('success'), 
            errors: req.flash('error') 
        });
    });
};