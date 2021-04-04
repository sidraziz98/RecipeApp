const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30m' }
    );
};

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer')) {
        const token = authorization.split(' ')[1]; // Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decode) => {
                if (err) {
                    res.status(401).send(jsonResponse(null, 'Invalid Token' ));
                } else {
                    req.id = decode.id;
                    next();
                }
            }
        );
    } else {
        res.status(401).send(jsonResponse(null, 'No Token' ));
    }
};

const jsonResponse = (data, message) => {
    if (data) {
        return {
            header: { error: 0, message },
            data
        };
    }
    else {
        return {
            header: { error: 1, message }
        };
    }
};

module.exports = { generateToken: generateToken, isAuth: isAuth, jsonResponse: jsonResponse };