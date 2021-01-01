const jwt = require("jsonwebtoken");

module.exports = function ( req, res, next ) {
    const token = req.header("auth-token");
    console.log(token);

    if ( !token ) return res.json({ error: 'Access Denied! Log In' });

    try {
        const verified = jwt.verify(token, 'DevUpTopSecretPhil');
        req.user = verified;
        next();
    } catch (error) {
        res.json({ error: 'Invalid Token! Log In' });
    }
}

