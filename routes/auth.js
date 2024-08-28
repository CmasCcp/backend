const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = Router();


// Mock database
const users = [];

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

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


router.get("/", authenticateToken,(req, res)=>{
    console.log(req.header("Authorization"));
    if(req.json.ok){
        console.log(req.header("Authorization"));
        res.send("authenticated");
    }else{
        res.send("Not authenticated");
    }
});



router.post('/api/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send('User registered');
});

// Login route
router.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Protected route
router.get('/api/user/profile', authenticateToken, (req, res) => {
    res.json({ email: req.user.email });
});

module.exports = router;