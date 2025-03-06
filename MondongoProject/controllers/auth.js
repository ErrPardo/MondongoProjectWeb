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

const loginCtrl=async(req,res)=>{
    try{
        
        req=matchedData(req)
        console.log(req)
        const user=await UserModel.findOne({email:req.email}).select("password name role email")
        if(!user){
            res.status(403).send("No se ha encontrado el usuario")
        }
        else{
            const hashPassword=user.password
            const check=compare(req.password,hashPassword)
            if(!check){
                res.satus(403).send("Error en la comprobacion de la contraseña")
            }
            else{
                user.set('password', undefined, { strict: false })
                const data = {
                    token: await tokenSign(user),
                    user: user
                }
                res.send(data)
            }
        }
    }catch(e){
        console.log(e)
        res.status(500).send("Error en la peticion")
    }
    

}

module.exports={createItem,loginCtrl}