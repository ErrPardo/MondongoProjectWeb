
const TrackModel=require('../models/track.js')
const { handleHttpError } = require('../utils/handleError.js')
const {matchedData} = require('express-validator')

//sencillo
/*const createItem=async(req,res)=>{
    const result=await TrackModel.create(req.body)
    console.log("Recurso creado",result)
    res.status(201).json(result)
}*/

//comprobando matchData comprueba con el validador, cuando hace un check pone un valor que lo comprueba el match si no hay nada lo borra
const createItem=async(req,res)=>{
    try{
        const body=matchedData(req)
        const result=await TrackModel.create(body)
        res.status(201).send(result)
    }
    catch(e){
        handleHttpError(res,'ERROR_CREATE_ITEMS')
    }
}

//este el caso que lo hace bien
const getItems=async(req,res)=>{
    try{
        const result=await TrackModel.find()
        res.status(200).send(result)
    }
    catch(e){
        handleHttpError(res,'ERROR_GET_ITEMS',403)
    }
    
}

//hacemos un find_by_id para que salte el error de http
/*const getItems=async(req,res)=>{
    try{
        const result=await TrackModel.findById('2')
        res.status(200).send(result)
    }
    catch(e){
        handleHttpError(res,'ERROR_GET_ITEMS',403)
    }
    
}*/

const deleteItem = async (req, res) => {
    try {
        const data = await TrackModel.delete({ _id: req.params.id })
        if (!data) {
            return res.status(404).json({ message: "Elemento no encontrado" })
        }
        res.json({ message: "Elemento eliminado", data })
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar el elemento", error })
    }
}

const changeItem = async (req, res) => {
    try {
        const id = req.params.id
        const data = await TrackModel.findOneAndReplace({_id: id }, req.body, { returnDocument: 'after' })
        if (!data) {
            return res.status(404).json({ message: "Elemento no encontrado" })
        }
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el elemento", error })
    }
}

const patchItem = async (req, res) => {
    try {
        const id = req.params.id
        const data = await TrackModel.findOneAndUpdate({_id: id }, req.body,{ new: true })
        if (!data) {
            return res.status(404).json({ message: "Elemento no encontrado" })
        }
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el elemento", error })
    }
}



module.exports={createItem,getItems,deleteItem,changeItem,patchItem} 