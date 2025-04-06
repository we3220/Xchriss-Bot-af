const { cmd, GIFBufferToVideoBuffer, getBuffer, fetchJson } = require("../lib")
const axios = require("axios")
const Index = cmd
const config = require("../config")
Index({
	pattern: 'kiss',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
    let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/kiss`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(reaction, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} kissed @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender.split("@")[0]} kissed Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'bite',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/bite`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} bite @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} bite Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'blush',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/blush`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} blushed at @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} blushed at Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'bonk',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/bonk`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} bonked @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} bonked Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'cringe',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/cringe`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} cringed @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} cringed Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'bully',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/bully`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} bullied @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} bullied Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'cry',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/cry`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} cried to @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} cried to Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'cuddle',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/cuddle`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} cuddled @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} cuddled Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'hug',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/hug`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} hugged @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} hugged Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'pat',
	desc: 'reaction',
	category: 'reaction',
	filename: __filename
}, async (conn, message, args) => {
let target = message.quoted ? message.quoted.sender : null
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/pat`);
    let reaction = await getBuffer(url)
    let result = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"))
    if (target) {
    await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*@${message.sender.split("@")[0]} patted @${target.split("@")[0]}*`, mentions: [`${message.sender}`, `${target}`]})
  } else {
       await conn.sendMessage(message.jid, { video: result, gifPlayback: true, caption: `*${message.sender} patted Everyone*`, mentions: [`${message.sender}`]})
    }
});


Index({
	pattern: 'waifu',
	desc: 'Weeb',
	category: 'weeb',
	filename: __filename
}, async (conn, message, args) => {
    const result = await axios.get(`https://api.waifu.pics/sfw/waifu`);
    await conn.sendMessage(message.jid, { image: { url: result.data.url }, caption: config.BOT_NAME }, { quoted: message.card })
});


Index({
	pattern: 'shinobu',
	desc: 'Weeb',
	category: 'weeb',
	filename: __filename
}, async (conn, message, args) => {
    const result = await axios.get(`https://api.waifu.pics/sfw/shinobu`);
    await conn.sendMessage(message.jid, { image: { url: result.data.url }, caption: config.BOT_NAME }, { quoted: message.card })
});


Index({
	pattern: 'neko',
	desc: 'Weeb',
	category: 'weeb',
	filename: __filename
}, async (conn, message, args) => {
    const result = await axios.get(`https://api.waifu.pics/sfw/neko`);
    await conn.sendMessage(message.jid, { image: { url: result.data.url }, caption: config.BOT_NAME }, { quoted: message.card })
});


Index({
	pattern: 'megumin',
	desc: 'Weeb',
	category: 'weeb',
	filename: __filename
}, async (conn, message, args) => {
    const result = await axios.get(`https://api.waifu.pics/sfw/megumin`);
    await conn.sendMessage(message.jid, { image: { url: result.data.url }, caption: config.BOT_NAME }, { quoted: message.card })
});
