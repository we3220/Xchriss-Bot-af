const plugins = require("../lib/commands")
const { cmd, commands, formatTime } = require("../lib/index")
const process = require("process")
const { OWNER_NAME, BOT_NAME, HANDLERS, MODE } = require("../config");
const os = require('os');
const { sizeFormatter } = require('human-readable')
const fs = require("fs")
const path = require("path")
const Index = cmd
const xchriss = fs.readFileSync(path.resolve(__dirname, './media/logo.jpg'));
const makinol = fs.readFileSync(path.resolve(__dirname, './media/taira2.jpg'));
const packg = require(path.resolve(__dirname, '../package.json'))
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);

Index({
  pattern: 'menu',
  react: "☃️",
  desc: "menu",
  category: 'info',
  filename: __filename
}, async (conn, message, args) => {
  const commandslist = {};
let card = message.card
  commands.forEach(command => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
          let match;
          let mmatch;

          try {
              match = command.pattern.toString().match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/);
              mmatch = command.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
          } catch {
              match = [command.pattern];
          }
        const HANDLER = /\[(\W*)\]/.test(HANDLERS) ? HANDLERS.match(/\[(\W*)\]/)[1][0] : '.';
          if (!commandslist[command.category]) commandslist[command.category] = [];
          commandslist[command.category].push((match.length >= 3 ? (HANDLER + mmatch) : command.pattern).trim());
      }
  });
  let [date, time] = new Date()
  .toLocaleString("en-IN", { timeZone: "Africa/Lagos" })
  .split(",");
       let msg = `
  ┏━━『 *✞Xᴄʜʀɪss Bot✞* 』━━┓

  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    ◈ User    : *${message.pushName}*
    ◈ Owner   : *${OWNER_NAME}*
    ◈ Time    : *${time.trim()}*
    ◈ Plugins : *${commands.length}*
    ◈ Prefix  : *${HANDLERS}*
    ◈ Runtime : *${runtime(process.uptime())}*
    ◈ Mode : ${MODE}
    ◈ Platform :  ${os.platform()}
    ◈ Dev     : *𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾*
  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  ┏━『 COMMAND LIST 』━┓${readmore}`

  for (const command in commandslist) {
    msg += `\n
    ┣━━『 *${command.toUpperCase()}* 』━━┫\n`;

      for (const plugin of commandslist[command]) {
          msg += `\t❍ *${plugin.toLowerCase()}*\n`;
      }
  }
     let buttonMessage = {
        image: xchriss,
        caption: msg,
        footer: packg.version,
        headerType: 4,
        contextInfo: {
        externalAdReply: {
             title: BOT_NAME,
             body: "ᴄᴏᴍᴍᴀɴᴅ ʟɪsᴛ", 
             thumbnail: makinol,
             mediaType: 4,
             mediaUrl: `https://t.me/Tha_Healer`,
             sourceUrl: `https://t.me/Tha_Healer`,
            },
        },
    }
       await conn.sendMessage(message.jid, buttonMessage, { quoted: card });
  /*await client.sendMessage(message.jid, {
      video: fs.readFileSync(__dirname + "/xchriss.mp4"),
      videoPlayback: true,
      caption: msg,
      contextInfo: {
      mentionedJid: [message.sender],
      externalAdReply: {
      title: '✞Xᴄʜʀɪss Bot✞',
      body: '𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾',
      thumbnailUrl: "https://files.catbox.moe/sir9d9.jpg",
      sourceUrl: `https://t.me/Tha_Healer`,
      mediaType: 1,
      renderLargerThumbnail: true
      }
      }}, { quoted: card })*/
});


const runtime = function(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " d " : " d ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.runtime = runtime;
