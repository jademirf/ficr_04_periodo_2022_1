// Carrega o pacote express
require('dotenv').config()
const express = require('express')
const app = express() // inicia um objeto app do tipo express
const port = process.env.PORT || 3000 // define a porta que será utilizada pelo serviço
const routes = require('./src/routes')
const { Sequelize, DataTypes } = require('sequelize')

const db_host = process.env.DB_HOST
const db_database =process.env.DB_NAME
const db_username =process.env.DB_USER
const db_password =process.env.DB_PASS
const db_port = process.env.DB_PORT
const db_dialect = process.env.DB_DIALECT

const sequelize = new Sequelize(db_database, db_username, db_password, {
  host: db_host,
  port: db_port,
  dialect: db_dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

  try {
    sequelize.authenticate();
    console.log('Funfou!!! \uD83D\uDE80');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // Registrando a estrutura da tabela como modelo no sequelize
  const User = sequelize.define('User', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });

  try {
    User.sync()
    console.log("Tabela criada com sucesso")
  } catch {
    console.log("erro na criação da tabela: ", error)
  }

  const createUser = async () => {
    try {
      const newUser = await User.create(
        {
          name: "Desmennyellysson Jerry",
          email: "desmeny@gmail.com",
          password: "senhaSuperSecreta123"
        }
      )
    } catch {
      console.log("Deu ruim...")
    }
  }
  createUser()


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