const express=require('express')
const { createItem,getItems,deleteItem,changeItem,patchItem } = require('../controllers/track')
const { validatorCreateItem } = require('../validators/validator')
const customHeader = require('../middleware/customHeader')

const routerTrack=express.Router()

routerTrack.use(express.json())

//funciona tanto con middleware y con arrays
routerTrack.post('/',validatorCreateItem,createItem)

routerTrack.get('/', customHeader,getItems)

routerTrack.delete('/:id',deleteItem)

routerTrack.put('/:id',changeItem)

routerTrack.patch('/:id',patchItem)

module.exports=routerTrack