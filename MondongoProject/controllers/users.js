const UserModel=require('../models/users.js')

const getItems=async(req,res)=>{
    const user=req.user
    const result=await UserModel.find()
    res.status(200).json({result,"middleware User":user})
}


const createItem=async(req,res)=>{
    const result=await UserModel.create(req.body)
    console.log("Recurso creado",result)
    res.status(201).json(result)
}

const changeItem=async(req,res)=>{
    const email = req.params.email;
    const data = await UserModel.findOneAndReplace(
        {email}, 
        req.body,{returnDocument:'after'})
    res.json(data)
}

const deleteItem=async(req,res)=>{
    const data = await UserModel.findOneAndDelete({email: req.params.email})
    res.json(data)
}
//patch ahcer findOneAndUpdate

const patchItem=async(req,res)=>{
    try{
        const data=await UserModel.findOneAndUpdate({email:req.params.id},req.body,{new:true})
    if(!data){
        res.status(400).send("No se ha encontrado el elemento")
    }
    res.json(data)
    }
    catch(e){
        res.status(400).send("Error al actualizar el elemento")
    }
    
}

module.exports={createItem,changeItem,getItems,deleteItem, patchItem}