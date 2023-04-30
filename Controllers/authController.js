const { v4: uuidv4 } = require('uuid');
const { tokenSign } = require('../helpers/generateToken')
const { compare, encrypt } = require('../helpers/passwordBcrypt')
const userModel = require('../Models/userModel');
const { generateSMS } = require('../Helpers/smsAuth')
const { getTemplate, sendMail } = require('../Helpers/email.Auth');
const { getTemplatePL, sendMailPasswordless } = require('../Helpers/loginPasswordLess');
const { generateMD5Token } = require('../Helpers/tokenConfirm');


const loginCtrl = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!password) { // Verificar si solo es el email

            //Buscar usuario el la base de datos 
            const user = await userModel.model.findOne({ email })
            if (!user) {
                console.log('User not found:', email);
                res.status(404).send({ error: 'User not found' });
                return;
            }

            const token = generateMD5Token();
            user.token = token;
            await user.save();
            const tokenSession = await tokenSign(user);
            const html = getTemplatePL(user.firstName, token);

            await sendMailPasswordless(email, html);

            console.log('Token session created:', tokenSession);
            res.send({ tokenSession, data: user });
            return;
        }

        const user = await userModel.model.findOne({ email })

        if (!user) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await compare(password, user.password)

        const tokenSession = await tokenSign(user)

        if (checkPassword) {


            const code = await generateSMS(user.phone);
            console.log(code);

            res.send({
                tokenSession,
                code,
                data: user

            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        (res, e)
    }


};

const registerCtrl = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        const passwordHash = await encrypt(password)
        const code = uuidv4();
        const token = generateMD5Token();
        const html = getTemplate(firstName, token);

        await sendMail(email, html);

        const newUser = new userModel.model({
            email,
            password: passwordHash,
            firstName,
            lastName,
            phone,
            role: 'user',
            token: token,
            code: code
        });

        newUser.save((error) => {
            if (error) {
                return res.status(500).send(error);
            }

            res.status(201).send({
                data: newUser,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


const confirm = async (req, res) => {
    try {
        // Obtener el token
        const { token } = req.params;

        // Verificar existencia del usuario
        const user = await userModel.model.findOne({ token });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'El usuario no existe'
            });
        }

        // Verificar el estado del usuario
        if (user.status === 'VERIFIED') {
            return res.status(400).json({
                success: false,
                msg: 'El usuario ya ha sido verificado'
            });
        }

        // Actualizar el estado del usuario
        user.status = 'VERIFIED';
        await user.save();

        const confirmationMsg = 'Tu cuenta ha sido verificada exitosamente. Por favor, inicia sesión para continuar.';

        // Redireccionar al usuario a la página de inicio de sesión
        return res.redirect(`http://localhost:3000/?msg=${encodeURIComponent(confirmationMsg)}`);


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: 'Error al confirmar el usuario'
        });
    }
};

const confirmPasswordLess = async (req, res) => {
    try {
        // Obtener el token
        const { token } = req.params;

        // Verificar existencia del usuario
        const user = await userModel.model.findOne({ token });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'El usuario no existe'
            });
        }

        console.log(user._id)
        // Redireccionar al usuario a la página de inicio de sesión
        return res.redirect(`http://localhost:3000/home/?token=${encodeURIComponent(token)}&userid=${encodeURIComponent(user._id)}`);



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: 'Error al confirmar el usuario'
        });
    }
};



module.exports = { loginCtrl, registerCtrl, confirm, confirmPasswordLess };