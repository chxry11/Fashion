const db = require('../db');
exports.getSalesReport = async (req, res) => {
    try {
        const query = `
            SELECT 
            p.productName, 
            p.productPrice,  
            SUM(o.orderProductQuantity) AS totalQuantity, 
            SUM(o.orderProductQuantity * p.productPrice) AS totalSales
        FROM order_items o
        JOIN products p ON o.orderProductId = p.productId
        GROUP BY p.productId, p.productName, p.productPrice;
         `;

        db.query(query, (err, results) => {
            if (err) {
                console.error("Database Error: ", err);
                return res.status(500).send("Database query failed");
            }

            // Convert totalSales and itemPrice to numbers
            const formattedResults = results.map(sale => ({
                itemName: sale.itemName,
                itemPrice: Number(sale.itemPrice), // Ensure itemPrice is a number
                totalQuantity: sale.totalQuantity,
                totalSales: Number(sale.totalSales) // Ensure totalSales is a number
            }));

            res.render("report", { sales: formattedResults, user: req.session.user }); // Rendering 'report.ejs'
        });

    } catch (error) {
        console.error("Server Error: ", error);
        res.status(500).send("Internal server error");
    }
};