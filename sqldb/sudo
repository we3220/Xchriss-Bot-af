const config = require('../config');
const { DataTypes } = require('sequelize');

const sudoDb = config.DB.define("sudo", {
   number: {
     type: DataTypes.STRING,
     allowNull: false
   }
});

async function init() {
    try {
        await config.DB.sync();
    } catch (error) {
        console.error(error);
    }
}

init();

const setSudo = async (user) => {
	await sudoDb.create({ number: user })
}

const getSudo = async () => {
	try {
		await sudoDb.findAll()
	} catch (err) {
		console.error(err)
	}
}

const delSudo = async (user) => {
    try {
        await sudoDb.destroy({ where: { user } })
    } catch (err) {
        console.error(err)
    }
}

module.exports = { sudoDb, setSudo, delSudo, getSudo }
