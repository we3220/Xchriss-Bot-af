const { Sequelize } = require('sequelize');
const toBool = (x) => x == 'true'
const DATABASE_URL = process.env.DATABASE_URL === undefined ? "./database.db" : process.env.DATABASE_URL;
module.exports = {
  ANTICALL_END: toBool(process.env.ANTICALL_END) || true,
  ANTICALL_BLOCK: toBool(process.env.ANTICALL_BLOCK) || true,
  ANTIDELETE: toBool(process.env.ANTIDELETE) || true,
  ANTILINK: toBool(process.env.ANTILINK) || true,
  BOT_NAME: process.env.BOT_NAME || "𒊹𝐗𝐂𝐇𝐑𝐈𝐒𝐒 𝐁𝐎𝐓𒊹",
  ERROR_MSG: toBool(process.env.ERROR_MSG) || true,
  GREETINGS: toBool(process.env.GREETINGS) || true,
  HANDLERS:  process.env.HANDLERS === undefined ? '.' : process.env.HANDLERS,
  LOG_MSG: toBool(process.env.LOG_MSG) || true,
  MODE: (process.env.MODE || 'public').toLowerCase(),
  OWNER_NAME: process.env.OWNER_NAME || "𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾",
  OWNER_NUMBER: process.env.OWMER_NUMBER || "2349072958046",
  PDM: toBool(process.env.PDM) || true,
  PRESENCE: process.env.PRESENCE || "1", // 1 - composing, 2 - recording, 3 - available, 4 - unavailable
  READ_MSG: toBool(process.env.READ_MSG) || false,
  READ_STATUS: toBool(process.env.READ_STATUS) || true,
  SESSION_ID: process.env.SESSION_ID || " ",
  SUDO: process.env.SUDO || "2349072958046,2349031616504,2348083569647",
  DB: DATABASE_URL === "./database.db" ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: false }) : new Sequelize(DATABASE_URL, {dialect: "postgres", ssl: true, protocol: "postgres", dialectOptions: { native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false })
}
