const { Sequelize } = require('sequelize');
const toBool = (x) => x == 'true'
const DB_URL =  process.env.DATABASE_URL || '';

module.exports = {
  ANTICALL_END: toBool(process.env.ANTICALL_END) || false,
  ANTICALL_BLOCK: toBool(process.env.ANTICALL_BLOCK) || false,
  ANTIDELETE: toBool(process.env.ANTIDELETE) || false,
  ANTILINK: toBool(process.env.ANTILINK) || true,
  BASE_URL : "https://pair-creds-6hra.onrender.com",
  BOT_NAME: process.env.BOT_NAME || "𒊹MRX DRAGNIR𒊹",
  ERROR_MSG: toBool(process.env.ERROR_MSG) || true,
  GREETINGS: toBool(process.env.GREETINGS) || true,
  HANDLERS:  process.env.HANDLERS === undefined ? '.' : process.env.HANDLERS,
  LOG_MSG: toBool(process.env.LOG_MSG) || true,
  MODE: (process.env.MODE || 'public').toLowerCase(),
  OWNER_NAME: process.env.OWNER_NAME || "𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾",
  OWNER_NUMBER: process.env.OWMER_NUMBER || "+50936812628",
  PDM: toBool(process.env.PDM) || true,
  PRESENCE: process.env.PRESENCE || "1", // 1 - composing, 2 - recording, 3 - available, 4 - unavailable
  READ_MSG: toBool(process.env.READ_MSG) || false,
  READ_STATUS: toBool(process.env.READ_STATUS) || true,
  SESSION_ID: process.env.SESSION_ID || "taira_tech-dafbb663058f6a1ce40e9180572ca31c",
  SUDO: process.env.SUDO || "+50936812628,+50947510619,+50932844372",
  DATABASE: DB_URL ? new Sequelize(DB_URL,{dialect:'postgres',ssl:true,protocol: 'postgres', dialectOptions: {native: true,ssl:{require: true,rejectUnauthorized: false}}, logging: false}) : new Sequelize({dialect:'sqlite',storage:'./database.db',logging:false}) 
}
