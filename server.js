// Carrega o pacote express
const express = require('express')
const app = express() // inicia um objeto app do tipo express
const jwt = require('jsonwebtoken') // cria um objeto jwt
const md5 = require("crypto-md5")
const port = 3000 // define a porta que será utilizada pelo serviço

app.use(express.json())
app.use(express.urlencoded())
// criando a rota incial no método get
app.get('/', (req, res) => {
  // retorna mensagem de texto como resposta
  res.json({message: 'Hello World!'})
})

app.post('/signin', (req, res)=>{
  const {user} = req.body // recebe as informações da requisição
  // compara se o usuário existe e se a senha informada é dele
  const fakeUser = {
    login: 'desmennyellysson',
    pass: md5('desmenny123')
  }

  const jwtPass =  md5('senhaSecreta')
console.log(jwtPass)
  if (user.login === fakeUser.login) {
    if (md5(user.pass) === fakeUser.pass) {
      const jwtPayload = {
        login: 'Desmennyellysson',
        role: 'Manager',
        idNumber: 'ABC-1235'
      }
      const token = jwt.sign(jwtPayload, jwtPass)
      res.json({ message: 'usuário logado com sucesso', token })
    } else {
      res.status(401).json({message: 'login ou senha incorreto!'})
    }
  } else {
    res.status(401).json({message: 'login ou senha incorreto!'})
  }
})

// iniciando o servidor na porta definida na const port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})