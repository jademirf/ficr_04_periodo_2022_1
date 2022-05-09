const sequelize = require("../../db")
const { DataTypes } = require("sequelize")
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

  module.exports = User