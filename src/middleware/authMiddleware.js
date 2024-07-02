const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const openPaths = [
        '/api/veterinarios/login',
        '/api/veterinarios'
    ];

    if (openPaths.includes(req.path)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authorization header must be provided and formatted correctly as 'Bearer <token>'" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'secret');
        req.veterinario = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized", error: "Invalid token" });
    }
};


module.exports = authMiddleware;

