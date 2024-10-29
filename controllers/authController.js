const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Cargar variables de entorno

const JWT_SECRET = process.env.JWT_SECRET; // Cargar JWT_SECRET desde el .env
const JWT_EXPIRES_IN = "2d";

async function login(req, res) {
    const { username, password } = req.body;

    // Buscar usuario en MongoDB
    const user = await userModel.getUserByUsername(username);

    if (!user) {
        return res.status(403).json({ code: 403, message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(403).json({ code: 403, message: "Contraseña incorrecta" });
    }

    // Crear el token JWT con el id del usuario para identificación
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({
        code: 200,
        message: "Inicio de sesión exitoso",
        token,
    });
}

async function register(req, res) {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ code: 400, message: "El usuario ya existe" });
    }

    // Crear un nuevo usuario
    const newUser = new userModel.User({ username, password });
    await newUser.save(); // Guardar el usuario en la base de datos

    return res.status(201).json({
        code: 201,
        message: "Usuario creado exitosamente",
    });
}

module.exports = { login, register, JWT_SECRET };
