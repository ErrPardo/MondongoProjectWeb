const {check}=require("express-validator")
const validateResults=require("../utils/handleValidator")
//with message para poner nuestros errores
const validatorCreateItem=[
    check("name").exists().notEmpty().withMessage("Error de nombre"),
    check("album").exists().notEmpty(),
    check("cover").optional(),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty(),
    check("duration.start").exists().notEmpty().isInt(),
    check("duration.end").exists().notEmpty().isInt(),
    check("mediaId").exists().notEmpty().isMongoId(),
    (req,res,next)=>validateResults(req,res,next)
    
]

const validateCreateUser=[
    check("name").exists().notEmpty()



]

module.exports={validatorCreateItem,validateCreateUser}