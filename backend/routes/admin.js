const express = require("express");
const connection = require("../database");
const router = express.Router();


// GET endpoint to retrieve details for a specific admin
router.get('/:adminId', (req, res, next) => {
    // Authentication and authorization middleware should go here

    const adminId = req.params.adminId;
    var query = "SELECT admin_id, name, email FROM admin WHERE admin_id = ?";
    connection.query(query, [adminId], (err, results) => {
        if (!err) {
            if (results.length > 0) {
                return res.status(200).json(results[0]); // Send the first result since IDs are unique
            } else {
                return res.status(404).json({ message: "Admin not found" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});


// Admin registration endpoint
router.post('/register', (req, res, next) => {
    let admin = req.body;
    var query = "INSERT INTO admin(name, email, password) VALUES(?,?,?)";
    connection.query(query, [admin.name, admin.email, admin.password], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Admin registered successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Admin login endpoint
router.post('/login', (req, res, next) => {
    let admin = req.body;
    var query = "SELECT * FROM admin WHERE email=? AND password=?";
    connection.query(query, [admin.email, admin.password], (err, results) => {
        if (!err && results.length > 0) {
            return res.status(200).json({
                message: "Admin logged in successfully",
                admin_id: results[0].admin_id
            });
        } else if (results.length <= 0) {
            return res.status(404).json({ message: "Admin not found. Please check your login details." });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;
