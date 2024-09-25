const express = require('express');
const authMiddleware = require('./authMiddleware');
const db = require('./db');
const router = express.Router();


router.get('/profile', authMiddleware, (req, res) => {
    const userId = req.user.userId; // Get from JWT token

    db.get('SELECT name, email FROM users WHERE id = ?', [userId], (err, user) => {
        if (err || !user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    });
});

module.exports = router;