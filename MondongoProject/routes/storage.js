const express=require('express')

const routerStorage=express.Router()

routerStorage.use(express.json())

const {uploadMiddleware,uploadMiddlewareMemory}=require("../utils/handlestorage.js")
const {getItems,createItem,changeItem,deleteItem,uploadImage,patchItem}=require("../controllers/storage.js")
const {validatorCreateItem}=require("../validators/validator.js")

routerStorage.get('/',getItems)

routerStorage.post('/',validatorCreateItem,createItem)
//routerStorage.post("/local", uploadMiddleware.single("image"), createItem)
//guarda primero el fichero en storage y luego crea el item en el servido
//single porque subes un fichero, image es la clave que le damos

routerStorage.put('/:id',changeItem)

routerStorage.delete('/:id',deleteItem)

//filtrado de los errores te creas una arrow function le pasas esta funcion y un filtrado de esta para el error del tamaño

routerStorage.post("/",uploadMiddlewareMemory.single("image"),(err,req,res,next)=>{
    if(err.code=="LIMIT_FILE_SIZE"){
        res.status(400).send("El archivo es demasiado grande")
    }
},uploadImage)

/*routerStorage.use((err,req,res,next)=>{
    if(err.code=="LIMIT_FILE_SIZE"){
        res.status(400).send("El archivo es demasiado grande")
    }
})*/

routerStorage.patch('/:id',patchItem)



module.exports=routerStorage