const { cmd, ephoto } = require('../lib');
const { BOT_NAME } = require("../config")
const fs = require("fs")
const path = require("path")
const xchriss = fs.readFileSync(path.resolve(__dirname, './media/logo.jpg'));
const makinol = fs.readFileSync(path.resolve(__dirname, './media/taira2.jpg'));

const replyImage = async (conn, message, image) => {
  mssg = "- " + BOT_NAME
  let buttonMessage = {
        image: { url: image },
        caption: mssg,
        headerType: 4,
        contextInfo: {
          mentionedJid:[message.sender],
          externalAdReply: {
             title: BOT_NAME,
             body: "𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾🙂‍↔️",
             thumbnail: makinol,
             mediaType: 4,
             mediaUrl: `https://t.me/Tha_Healer`,
             sourceUrl: `https://t.me/Tha_Healer`,                          },
        },
    }
    await conn.sendMessage(message.jid, buttonMessage);
}

cmd({
  pattern: 'glitchtext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'writetext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'advancedglow',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/advanced-glow-effects-74.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'typographytext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'pixelglitch',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'neonglitch',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'flagtext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'flag3dtext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'deletingtext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'blackpinkstyle',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'glowingtext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'underwatertext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'logomaker',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'cartoonstyle',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'papercutstyle',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let  link = 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'watercolortext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'effectclouds',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: 'blackpinklogo',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'gradienttext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'summerbeach',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'luxurygold',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let  link = 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'multicoloredneon',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'sandsummer',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'galaxywallpaper',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let  link = 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});

cmd({
  pattern: '1917',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/1917-style-text-effect-523.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'makingneon',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'royaltext',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/royal-text-effect-online-free-471.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'freecreate',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'galaxystyle',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});


cmd({
  pattern: 'lighteffects',
  desc: 'editor',
  category: 'ephoto',
  filename: __filename,
}, async (conn, message, args) => {
try {
  let q = message.args
  if (!q) return message.reply("Provide a text!")
  let link = 'https://en.ephoto360.com/create-light-effects-green-neon-online-429.html'
  let result = await ephoto(link, q.trim())
  await replyImage(conn, message, result)
} catch (error) {
    message.reply(error.toString())
}
});
