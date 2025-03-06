const express=require('express')
const customHeader=require('../middleware/customHeader.js')
const authMiddleware=require('../middleware/authMiddleware.js')
const routerUsers=express.Router()

routerUsers.use(express.json())

const {createItem,changeItem,getItems,deleteItem,patchItem}=require("../controllers/users.js")
const rolMiddleware = require('../middleware/rolMiddleware.js')

routerUsers.get('/',customHeader,authMiddleware,rolMiddleware([ 'admin' ]),getItems)

routerUsers.post('/',createItem)

routerUsers.put('/:email',changeItem)

routerUsers.delete('/:email',deleteItem)

routerUsers.patch('/:email',patchItem)


module.exports=routerUsers