const express = require('express')
const cors = require('cors')
const session = require('express-session');
const dotenv = require('dotenv')
dotenv.config()

const router = require('./src/routes/routes')

const app = express()
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Use `true` em produção com HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 horas em milissegundos
    }
}))
app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {
    console.log("Aplicação rodando na porta", process.env.PORT)
})