const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.json({
            "ok": false,
            "msg": "no hay token"
        });
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        res.status(400).json({
            "ok": false,
            "msg": "token no valido"
        });
    }

    next();

}

module.exports = {
    validarJWT
}