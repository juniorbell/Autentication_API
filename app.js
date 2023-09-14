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


//Models
const User = require ('./models/User')

//Registrar usuario
    app.post('/auth/register', async(req,res) => {
        const {name, email, password, confirmpassword} = req.body
        if(!name) {
            return res.status(422).json({msg: 'O nome é obrigatório'})
        }
        if(!email) {
            return res.status(422).json({msg: 'O e-mail é obrigatório'})
        }
        if(!password) {
            return res.status(422).json({msg: 'A senha é obrigatória'})
        }
        
        if ( password !== confirmpassword) {
            return res.status(422).json ( {msg: 'Senhas não conferem!'})
        }

        const userExists = await User.findOne ({email:email})
        if (userExists) {
            return res.status(422).json ({msg: 'email já cadastadro, favor utilize um e-mail válido'})
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User ({
            name,
            email,
            password: passwordHash,
        })
        try{
            await user.save()
            res.status(201).json ({msg: 'Usuario cadastro com sucesso!'})
        } catch(error) {
           console.log(error)
           
            res.status(500).json({msg: 'Algo aconteceu de errado, tente novamente mais tarde!'})
        }
    })
//autentication


app.post("/auth/login", async (req, res)=>{
    const {email, password} = req.body
    if(!email) {
        return res.status(422).json({msg: 'O e-mail é obrigatório'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatória'})
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

