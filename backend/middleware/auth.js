const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Header se token lein
    const token = req.header('x-auth-token');

    // Check karein ki token hai ya nahi
    if (!token) {
        // Agar public route (jaise /api/chat/anonymous) access karna hai,
        // toh token na hona theek hai. Lekin protected route ke liye error dein.
        // Humne routes ko alag kar diya hai, isliye yahan hum strict check kar sakte hain.
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Token ko verify karein
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // { id: 'user_id' } ko request mein add karein
        next(); // Agle middleware ya route par jaayein
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};