const rolMiddleware=(roles)=>(req,res,next)=>{
    try{
        const user=req.user
        const userRol=user.role
        console.log(userRol)
        console.log(roles)
        const checkRol=roles.some((roles) => userRol.includes(roles))
        console.log(checkRol)
        if(checkRol){
            next()
        }
        else{
            res.status(403).send("Error con el tipo de rol")
        }
    }
    catch(e){
        res.status(500).send("Error en el middleware ")
    }
}

module.exports=rolMiddleware