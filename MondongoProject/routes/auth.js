const express = require("express")

const router = express.Router()
const {createItem}=require("../controllers/auth.js")
const {validatorRegister, validatorLogin} = require("../validators/auth")

// Posteriormente, llevaremos la lógica al controller
router.post("/register", validatorRegister, createItem)

module.exports = router