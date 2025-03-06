
const customHeader=(req,res,next)=>{
    try{
        if(req.headers.api_key==process.env.PINATA_KEY){
            next()
        }
        else{
            res.status(403).send("Error la api_key no es la misma")
        }
    }
    catch(e){
        res.status(500).send("Se ha producido un error con la peticion")
    }
}



module.exports=customHeader