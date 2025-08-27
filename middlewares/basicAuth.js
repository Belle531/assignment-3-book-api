function basicAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Authentication required.');
    }
    // Example: username:password is admin:password
    const base64 = authHeader.split(' ')[1];
    const [username, password] = Buffer.from(base64, 'base64').toString().split(':');
    if (username === 'admin' && password === 'password') {
        next();
    } else {
        return res.status(401).send('Invalid credentials.');
    }
}

module.exports = basicAuth;
