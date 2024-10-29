const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // Carga la clave secreta desde las variables de entorno

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
        return res.status(403).json({ code: 403, message: "Token requerido" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            switch (err.name) {
                case "JsonWebTokenError":
                    return res.status(403).json({ code: 403, message: "Token inválido" });
                case "TokenExpiredError":
                    return res.status(401).json({ code: 401, message: "Token expirado" });
                default:
                    return res.status(400).json({ code: 400, message: "Error al verificar el token" });
            }
        }

        req.user = user; // Agrega el usuario verificado a la solicitud
        next();
    });
}

module.exports = authenticateToken;
