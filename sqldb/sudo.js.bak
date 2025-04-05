const config = require('../config');
const { DataTypes } = require('sequelize');

const SudoDB = config.DB.define('sudo', {
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

async function setSudo(number) {
  return await SudoDB.create({ number });
}

async function delSudo(number) {
  return await SudoDB.destroy({ where: { number } });
}

async function getSudo() {
  return await SudoDB.findAll();
}

module.exports = {
  SudoDB,
  setSudo,
  delSudo,
  getSudo
}
