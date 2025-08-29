function verifyBorrow(req, res, next) {
    const id = parseInt(req.params.id);
    const borrow = global.borrows.find(b => b.id === id);
    if (!borrow) {
        return res.status(404).json({ error: 'Borrow not found.' });
    }
    req.borrow = borrow;
    next();
}

module.exports = verifyBorrow;
