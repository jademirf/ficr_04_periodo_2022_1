// Carrega o pacote express
require('dotenv').config()
const express = require('express')
const app = express() // inicia um objeto app do tipo express
const cors = require("cors")
const port = process.env.PORT || 3000 // define a porta que será utilizada pelo serviço
const routes = require('./src/routes')
const sequelize = require("./db")

  try {
    sequelize.authenticate();
    console.log('Funfou!!! \uD83D\uDE80');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

// registrando o arquivo de rotas
routes(app)

// criando a rota incial no método get
app.get('/', (req, res) => {
  // retorna mensagem de texto como resposta
  res.json({message: 'Hello World!'})
})

// iniciando o servidor na porta definida na const port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})