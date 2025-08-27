function verifyToken(req, res, next) {
    // Dummy token check for demonstration
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer secret-token') {
        return res.status(401).json({ error: 'Invalid or missing token.' });
    }
    next();
}

module.exports = verifyToken;
