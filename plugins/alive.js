const { cmd, formatTime } = require('../lib/');
const axios = require("axios")
const config = require("../config")
const googleTTS = require("google-tts-api");
const Index = cmd

Index({
	pattern: 'readmore',
	desc: 'read more',
	category: 'converter',
	filename: __filename,
}, async (conn, message, args) => {
  if (!message.args) return message.reply("_Provide a text_")
  const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
 return await message.reply(`${readmore + message.args}`)
})


Index({
	pattern: 'ping',
	desc: 'Bot response in milliseconds.',
	category: 'info',
	filename: __filename
}, async (conn, message, args) => {
	const start = new Date().getTime();
	const msg = await message.reply('*ᴩɪɴɢ...*');
	const end = new Date().getTime();
	const responseTime = end - start;
	await message.reply(`*pong!*\nʟᴀᴛᴇɴᴄʏ: ${responseTime}ms`);
});


Index({
	pattern: 'jid',
	desc: 'To get remoteJid',
	category: 'info',
	filename: __filename
}, async (conn, message, args) => {
	await message.reply(message.mentionedJid[0] ? message.mentionedJid[0] : message.quoted ? message.quoted.sender : message.jid)
});

Index({
	pattern: 'uptime',
	desc: 'Get bots runtime',
	category: 'info',
	filename: __filename
}, async (conn, message, args) => {
	
        let pinga = `Uptime/Runtime:\n\t: ${formatTime(process.uptime())}`;
        conn.sendMessage(message.jid, {
        text: pinga,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: `𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾`, 
                body: "𒊹𝐗𝐂𝐇𝐑𝐈𝐒𝐒 𝐁𝐎𝐓𒊹",
                thumbnailUrl: "https://files.catbox.moe/sir9d9.jpg",
                sourceUrl: 'https://t.me/Tha_Healer',
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
          }, { quoted: message });
})


Index({
	pattern: 'tts',
	desc: 'Text to speech',
	category: 'converter',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.args) return message.reply('Please give me a Sentence to change into audio.')
            let texttts = message.args.toString()
            const ttsurl = googleTTS.getAudioUrl(texttts, { lang: "en", slow: false, host: "https://translate.google.com" });
            return await conn.sendMessage(message.jid, { audio: { url: ttsurl
            },
                mimetype: "audio/mpeg", fileName: `xchriss.m4a`,
            }, {
                quoted: message,
            })
            await fs.unlinkSync("./xchriss.m4a");
} catch (error) {
    message.reply(error.toString())
}
});



Index({
	pattern: 'repo',
	desc: 'To get remoteJid',
	category: 'info',
	filename: __filename
}, async (conn, message, args) => {
try {
    let { data } = await axios.get('https://api.github.com/repos/anonphoenix007/Xchriss-Bot');
    let txt = `
    𐁘 *forks: ${data.forks_count}*
    𐁘 *stars: ${data.stargazers_count}*
    𐁘 *Creator: https://t.me/Tha_Healer_*
    𐁘 *Web: https://ttech-web-server.onrender.com_*
    `
    await message.reply(txt)
} catch (error) {
    message.reply(error.toString())
}
});


Index({
	pattern: 'owner',
	desc: 'Send owner contact.',
	category: 'info',
	filename: __filename,
}, async (conn, message, args) => {
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:✞Xᴄʜʀɪss Bot✞\n' 
            + 'ORG: Taira Tech;\n'
            + `TEL;type=CELL;type=VOICE;waid= ${conn.user.id.split("@")[0] }: ${conn.user.id.split("@")[0]}\n`
            + 'END:VCARD' 
       let buttonMessage = {
           contacts: {
             displayName: config.OWNER_NAME,
             contacts: [{
             vcard
             }]
           },
           contextInfo: {
          externalAdReply: {
            title: config.OWNER_NAME,
            body: "Touch here.",
            renderLargerThumbnail: true,
            thumbnailUrl: `https://raw.githubusercontent.com/anonphoenix007/storage/main/logo.jpg`,
            thumbnail: "",
            mediaType: 2,
            mediaUrl: "",
            sourceUrl: `https://t.me/Tha_Healer`
            }
          }
       }
       await conn.sendMessage(message.jid, buttonMessage, { quoted: message.card });
       /*await conn.sendMessage(message.jid, { 
        contacts: { 
            displayName: '✞Xᴄʜʀɪss Bot✞', 
            contacts: [{ vcard }] 
        }
    }, { quoted: message.card })*/
});


Index({
    pattern: "test",
    desc: "test",
    category: "info",
    filename: __filename,
  }, async (conn, message, args) => {
  await conn.sendMessage(message.jid, { text: "✞Xᴄʜʀɪss Bot Active✞" }, {quoted: message.card })
  })
