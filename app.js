require('dotenv') .config()
const express = require('express')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require ('jsonwebtoken')


const app = express()

app.get('/', (req,res) => {
    res.status(200).json({msg: 'Seja bem vindo!'})
})

//config JSON

app.use(express.json())

//Registrar usuario
    app.post('/auth/register', async(req,res) => {
        const {name, email, password, confirmpassword} = req.body
        if(!name) {
            return res.status(422).json({msg: 'O nome é obrigatório'})
        }
    })


//Credenciais
const dbUser= process.env.DB_USER
const dbPassord= process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassord}@cluster0.acpuzdp.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>{
    app.listen(3000)
    console.log("conexão com o banco de dados bem sucedido")
})
.catch((err)=> console.log(err))

