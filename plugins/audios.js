const { cmd, ephoto } = require('../lib');
const { BOT_NAME } = require("../config")
const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")
const xchriss = fs.readFileSync(path.resolve(__dirname, './media/logo.jpg'));
const makinol = fs.readFileSync(path.resolve(__dirname, './media/taira2.jpg'));

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

const replyAudio = async (conn, message, audio) => {
  await conn.sendMessage(message.jid, {
         audio: audio,
         fileName: `audio-${getRandom()}.mp3`,
         mimetype: "audio/mpeg",
         contextInfo: {
             mentionedJid:[message.sender],
             externalAdReply: {
             title: BOT_NAME,
             body: `𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾`,
             thumbnailUrl: "https://raw.githubusercontent.com/anonphoenix007/storage/main/logo.jpg",
             sourceUrl: `https://t.me/Tha_Healer`,
             mediaType: 2,
             showAdAttribution: true,
             renderLargerThumbnail: true
             }
         }
        }, { quoted: card });
}


cmd({
  pattern: 'bass',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-af equalizer=f=54:width_type=o:width=2:g=20'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'blown',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-af acrusher=.1:1:64:0:log'
  let media = await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'deep',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let  set = '-af atempo=4/4,asetrate=44500*2/3'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'earrape',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-af volume=12'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'fast',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-filter:a "atempo=1.63,asetrate=44100"'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'fat',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-filter:a "atempo=1.6,asetrate=22100"'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'nightcore',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-filter:a atempo=1.06,asetrate=44100*1.25'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'reverse',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-filter_complex "areverse"'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'robot',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'slow',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let  set = '-filter:a "atempo=0.7,asetrate=44100"'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'smooth',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'squirrel',
  desc: 'audio editor',
  category: 'converter',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.quoted
  if (!q) return message.reply("reply to an audio!")
  let set = '-filter:a "atempo=0.5,asetrate=65100"'
  let media = await await conn.downloadAndSaveMediaMessage(q)
  let ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return message.reply(err.toString())
                let buff = fs.readFileSync(ran)
                replyImage(conn, message, buff)
                fs.unlinkSync(ran)
                })
} catch (error) {
    message.reply(error.toString())
}
});
