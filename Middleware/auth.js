const { verifyToken } = require('../helpers/generateToken')

const checkAuth = async (req, res, next) => {
    try {
        //TODO: authorization: Bearer 1010101010101001010100 
        const token = req.headers.authorization.split(' ').pop() //TODO:123123213
        const tokenData = await verifyToken(token)
        if (tokenData.userId) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        console.log(e)
        res.status(401) // Se cambia el código de error a 401 (Unauthorized)
        res.send({ error: 'No estás autorizado para realizar esta acción.' })
    }

}

module.exports = { checkAuth }