const jwt = require('jsonwebtoken') // cria um objeto jwt
const md5 = require("crypto-md5")

exports.signin = (req, res)=>{
    const {user} = req.body // recebe as informações da requisição
    // compara se o usuário existe e se a senha informada é dele
    const fakeUser = {
      login: 'desmennyellysson',
      pass: md5('desmenny123')
    }
  
    if (user.login === fakeUser.login) {
      if (md5(user.pass) === fakeUser.pass) {
        const jwtPayload = {
          login: 'Desmennyellysson',
          role: 'Manager',
          idNumber: 'ABC-1235'
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_KEY)
        res.json({ message: 'usuário logado com sucesso', token })
      } else {
        res.status(401).json({message: 'login ou senha incorreto!'})
      }
    } else {
      res.status(401).json({message: 'login ou senha incorreto!'})
    }
  }

exports.list = (req, res) => {
    const fakeUsersArray = [
        {
            id: 123,
            name: 'Desmennyellysson Jerry',
            email: 'desmeny@gmail.com'
        },
        {
            id: 133,
            name: 'Astrogildo Jerry',
            email: 'astro@gmail.com'
        }
    ]
    res.json(fakeUsersArray)
}