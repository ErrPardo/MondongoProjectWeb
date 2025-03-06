const UserModel=require("../models/users.js")
const { encrypt, compare } = require("../utils/handlePassword")
const {tokenSign}=require("../utils/handleJWT.js")
const { matchedData } = require("express-validator")

const createItem=async (req, res) => {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
    const dataUser = await UserModel.create(body)
    dataUser.set('password', undefined, { strict: false })
    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }   
    res.send(data)
}

module.exports={createItem}