// Carrega o pacote express
const express = require('express')
const app = express() // inicia um objeto app do tipo express
const port = 3000 // define a porta que será utilizada pelo serviço
const routes = require('./src/routes')


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