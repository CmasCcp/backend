const bcrypt = require('bcryptjs');
const { dbConnection } = require('../database/mysqlConfig');
const jwt = require('jsonwebtoken');


const postNewUser = async (req, res = response) => {
    try {
        const { email, password, name } = req.body;

        // Hashear el password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la base de datos
        const query = `INSERT INTO usuarios (email, contraseña, nombre) VALUES ("${email}", "${hashedPassword}", "${name}")`;
        const [result] = await dbConnection.query(query);

        // Comprobar si la inserción fue exitosa
        if (result.affectedRows === 1) {
            res.status(201).send('User registered');
        } else {
            res.status(500).send('Failed to register user');
        }
    } catch (error) {
        console.error('Error during usuario registration:', error);
        res.status(500).send('Internal Server Error');
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Consultar el usuario en la base de datos
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        const [rows] = await dbConnection.query(query, [email]);

        // Verificar si el usuario existe
        if (rows.length === 0) {
            return res.status(400).send('Invalid credentials');
        }

        const user = rows[0];

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.contraseña);
        if (!passwordMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Generar el token JWT
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).send('Internal Server Error');
    }
}

const executeQuery = async (query) => {
    try {
        const [results] = await dbConnection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    postNewUser,
    loginUser
}
