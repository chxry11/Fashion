const db = require('../db');

exports.contactForm = (req, res) => {
    res.render("contact"); // Render the contact form page
};

exports.submitContactForm = (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Please fill in all required fields.");
    }

    console.log("Contact Form Submission:", { name, email, phone, message });

    res.render("contactSuccess", { name, email, phone, message });
};
