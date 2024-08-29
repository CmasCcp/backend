const { Router } = require('express');
const jwt = require('jsonwebtoken');
const {postNewUser, loginUser} = require("../controllers/auth")

const router = Router();


// Secret key for JWT

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.post('/signup', postNewUser);

// Login route
router.post('/login', loginUser);

// Protected route
router.get('/api/user/profile', authenticateToken, (req, res) => {
    res.json({ email: req.user.email });
});

module.exports = router;