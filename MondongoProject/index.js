const express=require('express')
const cors=require('cors')
require('dotenv').config()
const dbConnect=require('./config/mongo')
const routerUsers = require('./routes/users')
const router=require('./routes/index')
const app=express()

//coge las variables de entorno


//dos middleware
app.use(cors())
app.use(express.json())
app.use(express.static('./storage'))

//app.use("/users",routerUsers)
app.use(router)

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log('Servidor iniciado en el puerto',port)  
})

dbConnect()

