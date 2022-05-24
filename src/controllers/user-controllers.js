const jwt = require('jsonwebtoken') // cria um objeto jwt
const md5 = require("crypto-md5")
const User = require("../models/users")

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const newUser = await User.create(
      {
        name,
        email,
        password: md5(password)
      }
    )
    res.json(newUser)
  } catch (err) {
    console.log("Deu ruim...", err)
    res.send(err)
  }
}

exports.signin = async (req, res)=>{
    const {user} = req.body // recebe as informações da requisição
    // compara se o usuário existe e se a senha informada é dele
    const user_bd = await User.findOne({
      where: {
        email: user.login
      }
    })
  
    if (user.login === user_bd.email) {
      console.log("Login correto!")
      if (md5(user.pass) === user_bd.password) {
        const jwtPayload = {
          name: user_bd.name,
          email: user_bd.email,
          role: 'Manager',
          idNumber: user_bd.id
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

exports.list = async (req, res) => {
    const fakeUsersArray = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    res.json(fakeUsersArray)
}

exports.show = async (req, res) => {
  const { userId } = req.params

  try{
    const user_bd = await User.findByPk(parseInt(userId), {
      attributes: { exclude: ['password'] }
    })
    console.log(user_bd)
    res.json({message: 'Ok, deu certo!', user: user_bd})
  } catch (err) {
    console.log(err)
  }

}