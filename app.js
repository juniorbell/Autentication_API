require('dotenv') .config()
const express = require('express')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require ('jsonwebtoken')


const app = express()

app.get('/', (req,res) => {
    res.status(200).json({msg: 'Seja bem vindo!'})
})


app.listen(3000)