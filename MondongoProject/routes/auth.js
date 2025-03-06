const express = require("express")

const router = express.Router()
const {createItem,loginCtrl}=require("../controllers/auth.js")
const {validatorRegister, validatorLogin} = require("../validators/auth")

// Posteriormente, llevaremos la lógica al controller
router.post("/register", validatorRegister, createItem)
router.post("/login",validatorLogin,loginCtrl)

module.exports = router