const StorageModel = require('../models/storage.js')
const uploadToPinata=require('../utils/handleUploadIPFS.js')

const getItems = async (req, res) => {
    try {
        const result = await StorageModel.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los elementos", error })
    }
}

const createItem = async (req, res) => {
    try {
        const { body, file } = req
        const fileData = {
            filename: file.filename,
            url: process.env.PUBLIC_URL+"/"+file.filename
        }
        const result = await StorageModel.create(fileData)
        console.log("Recurso creado", result)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: "Error al crear el elemento", error })
    }
}

const changeItem = async (req, res) => {
    try {
        const id = req.params.id
        const data = await StorageModel.findOneAndReplace({_id: id }, req.body, { returnDocument: 'after' })
        if (!data) {
            return res.status(404).json({ message: "Elemento no encontrado" })
        }
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el elemento", error })
    }
}

const deleteItem = async (req, res) => {
    try {
        const data = await StorageModel.findOneAndDelete({ _id: req.params.id })
        if (!data) {
            return res.status(404).json({ message: "Elemento no encontrado" })
        }
        res.json({ message: "Elemento eliminado", data })
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar el elemento", error })
    }
}

const patchItem = async (req, res) => {
    try {
        const id = req.params.id
        const data = await StorageModel.findOneAndUpdate({_id: id }, req.body,{ new: true })
        if (!data) {
            return res.status(404).json({ message: "Elemento no encontrado" })
        }
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el elemento", error })
    }
}

const uploadImage = async (req, res) => {
    try {
        const id = req.params.id
        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname
        const pinataResponse = await uploadToPinata(fileBuffer, fileName)
        const ipfsFile = pinataResponse.IpfsHash
        const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
        const data = await StorageModel.create({"filename":fileName,"image":ipfs,"url":ipfs})
        res.send(data)
        }catch(err) {
        console.log(err)
        res.status(500).send("ERROR_UPLOAD_COMPANY_IMAGE")
        //handleHttpError(res, "ERROR_UPLOAD_COMPANY_IMAGE")
    }
}


module.exports = { getItems, createItem, changeItem, deleteItem, uploadImage, patchItem }
