const config = require('../config');
const { DataTypes } = require('sequelize');

const SudoDB = config.DB.define('sudo', {
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

async function setsudo(number) {
  return await SudoDB.create({ number });
}

async function delsudo(number) {
  return await SudoDB.destroy({ where: { number } });
}

async function getsudo() {
  return await SudoDB.findAll();
}

module.exports = {
  SudoDB,
  setsudo,
  delsudo,
  getsudo
}
