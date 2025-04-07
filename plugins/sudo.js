const { cmd, mode } = require("../lib")
const fs = require("fs")
const path = require("path")
let sudo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../lib/sudo.json')))
//const xchriss = fs.readFileSync(path.resolve(__dirname, './media/ban.json'));
//const { addSudo, getAllSudos, deleteSudo } = require("../sqldb/sudo")
const Index = cmd


/*Index({
        pattern: 'setsudo',
        desc: 'Add sudo',
        category: 'owner',
        filename: __filename
}, async (conn, message, args) => {
try {
   if (!message.isCreator) return message.reply("_Command is for bot owner only")
   let user = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
   if (!user) return message.reply("_*Reply/Tag or provide a number*_")
   user = user.split("@")[0]
   let sudos = await getSudo()
   if (sudos.includes(user)) return message.reply("*_User is already In the SUDO db.*_")
   await addSudo(user)
   await message.reply(`${user} Has Been given Sudo Access`)
} catch (err) {
	message.reply(err.toString())
  }
})


Index({
        pattern: 'delsudo',
        desc: 'del sudo',
        category: 'owner',
        filename: __filename
}, async (conn, message, args) => {
try {
   if (!message.isCreator) return message.reply("_Command is for bot owner only")
   let user = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
   if (!user) return message.reply("_*Reply/Tag or provide a number*_")
   user = user.split("@")[0]
   let isDel = await deleteSudo()
   if (isDel) {
	   return message.reply(`${user} Has been removed from SUDO db.`)
   } else {
   	   return message.reply(`${user} is not SUDO`)
   }
} catch (err) {
        message.reply(err.toString())
  }
})


Index({
        pattern: 'getsudo',
        desc: 'get sudo',
        category: 'owner',
        filename: __filename
}, async (conn, message, args) => {
try {
   if (!message.isCreator) return message.reply("_Command is for bot owner only")
   let sudos = await getAllSudos()
   if (sudos.length === 0) return message.reply("No user found on the list")
   await message.reply(`Sudo numbers are \n${sudos}`)
} catch (err) {                                           
	message.reply(err.toString())
  }
});
*/

Index({
	pattern: 'intro',
	desc: 'intro',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
const conf = require("../config")
const xchriss = fs.readFileSync(path.resolve(__dirname, './media/logo.jpg'));
const makinol = fs.readFileSync(path.resolve(__dirname, './media/taira2.jpg'));
mssg =  `
    *[ ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ${conf.BOT_NAME} ]*
    *ᴜsᴇʀ:* ${message.pushName}
    *ᴄʀᴇᴀᴛᴏʀ:* *𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾*
    *ʟᴏᴄᴀᴛɪᴏɴ:* *ᴇᴀʀᴛʜ*
    *ᴛᴇʟᴇɢʀᴀᴍ:* *https://t.me/Tha_Healer*
    *sᴛᴀᴛᴜs:* *Busy*
    `
    let buttonMessage = {
        image: xchriss,
        caption: mssg,
        headerType: 4,
        contextInfo: {
        mentionedJid:[message.sender],
        externalAdReply: {
             title: conf.BOT_NAME,
             body: "ʙᴏᴛ ɪɴᴛʀᴏ 🙂‍↔️", 
             thumbnail: makinol,
             mediaType: 4,
             mediaUrl: `https://t.me/Tha_Healer`,
             sourceUrl: `https://t.me/Tha_Healer`,
            },
        },
    }
       await conn.sendMessage(message.jid, buttonMessage);
})


Index({
        pattern: 'vv2',
        alias: "rvo2",
        desc: 'view once',
        category: 'owner',
        filename: __filename
}, async (conn, message, args) => {
    if (!message.isCreator) return message.reply("_Command is for bot owner only")
    if (!message.quoted) {
        return message.reply(`*reply to a view once message!*`);
    }
    let mime = (message.quoted.msg || message.quoted).mtype || '';
    try {
        if (/image/.test(mime)) {
            let media = await message.quoted.download();
            await conn.sendMessage(message.botNumber, {
                image: media,
                caption: "",
            }, { quoted: message });

        } else if (/video/.test(mime)) {
            let media = await message.quoted.download();
            await conn.sendMessage(message.botNumber, {
                video: media,
                caption: "",
            }, { quoted: message });

        } else if (/audio/.test(mime)) {
            let media = await message.quoted.download();
            await conn.sendMessage(message.botNumber, {
                audio: media,
                mimetype: 'audio/mpeg',
                ptt: true // Set to true if you want to send as a voice note
            }, { quoted: message });

        } else {
            message.reply(`You need to reply to a view once message.`);
        }
    } catch (err) {
        console.error('Error processing media:', err);
        message.reply(`Failed to retrieve view once media.`);
    }
})


Index({
	pattern: 'vv',
	alias: "rvo",
	desc: 'view once',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
	if (!message.isCreator) return message.reply("_Command is for bot owner only")
    if (!message.quoted) {
        return message.reply(`*reply to a view once message!*`);
    }
    let mime = (message.quoted.msg || message.quoted).mtype || '';
    try {
        if (/image/.test(mime)) {
            let media = await message.quoted.download();
            await conn.sendMessage(message.jid, {
                image: media,
                caption: "",
            }, { quoted: message });

        } else if (/video/.test(mime)) {
            let media = await message.quoted.download();
            await conn.sendMessage(message.jid, {
                video: media,
                caption: "",
            }, { quoted: message });

        } else if (/audio/.test(mime)) {
            let media = await message.quoted.download();
            await conn.sendMessage(message.jid, {
                audio: media,
                mimetype: 'audio/mpeg',
                ptt: true // Set to true if you want to send as a voice note
            }, { quoted: message });

        } else {
            message.reply(`You need to reply to a view once message.`);
        }
    } catch (err) {
        console.error('Error processing media:', err);
        message.reply(`Failed to retrieve view once media.`);
    }
})


Index({
	pattern: 'setsudo',
	desc: 'Add sudo',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
   if (!message.isCreator) return message.reply("_Command is for bot owner only")
   let first = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
   if (!first) return message.reply("_*Reply/Tag or provide a number*_")
   let user = first.split("@")[0]
   if (sudo.includes(user)) return message.reply("*_User is already In the Sudo list*_")
   sudo.push(user)7
   fs.writeFileSync(path.resolve(__dirname, '../lib/sudo.json'), JSON.stringify(sudo))
   return await message.reply(`${user} Has Been given Sudo Access`)
});


Index({
	pattern: 'delsudo',
	desc: 'delete sudo',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
    if (!message.isCreator) return message.reply("_Command is for bot owner only")
    let first = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
   if (!first) return message.reply("_*Reply/Tag or provide a number*_")
   let user = first.split("@")[0]
   if (!sudo.includes(user)) return message.reply("*_User is not In the Sudo list*_")
   let fin = sudo.indexOf(user)
   sudo.splice(fin, 1)
   fs.writeFileSync(path.resolve(__dirname, '../lib/sudo.json'), JSON.stringify(sudo))
	return await message.reply(`${user} Has Been Deleted from Sudo users.`)
});

Index({
    pattern: 'getsudo',
    desc: 'get sudo',
    category: 'owner',
    filename: __filename
}, async (conn, message, args) => {
  if (!message.isCreator) return message.reply("_Command is for bot owner only")
  let txt = `*「 SUDO 」* `
  const nums = sudo
  return await message.reply(nums.map(num => `${txt}${num}`).join("\n"));
})


Index({
	pattern: 'block',
	desc: 'block',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
   if (!message.isCreator) return message.reply("_This command is for bot owner only_")
   let users = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '') + "@s.whatsapp.net" || message.jid
    await message.reply("_User successfully blocked!_") 
    await conn.updateBlockStatus(users, "block")
});


Index({
	pattern: 'unblock',
	desc: 'unblock',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
    if (!message.isCreator) return message.reply("_This command is for bot owner only_")
   let users = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '') + "@s.whatsapp.net" || message.jid
    await message.reply("_User successfully unblocked!_") 
    await conn.updateBlockStatus(users, "unblock")
});

Index({
	pattern: 'setbio',
	desc: 'set profile description',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
     if (!message.isCreator) return message.reply("_This command is for bot owner only_") 
    if (!message.args) return message.reply("_Provide a text/texts_")
    await conn.updateProfileStatus(message.args)
    await message.reply("_Profile description Updated_")
});

Index({
	pattern: 'removepp',
	desc: 'remove profile photo',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
     if (!message.isCreator) return message.reply("_This command is for bot owner only_")
    await conn.removeProfilePicture(conn.user.id)
    await message.reply("_Profile picture removed._")
});


Index({
	pattern: 'setname',
	desc: 'set profile name',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
     if (!message.isCreator) return message.reply("_This command is for bot owner only_")
    if (!message.args) return message.reply("_Provide a text/texts_")
    await conn.updateProfileName(message.args)
    await message.reply("_Profile Name Updated_")
});

Index({
	pattern: 'getbusiness',
	desc: 'business',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
    if (!message.isCreator) return message.reply("_This command is for bot owner only_")
   let users =  message.quoted ? message.quoted.sender : message.jid
   const profile = await conn.getBusinessProfile(users)
    await message.reply(`★ *Category:* ${profile.category}\n★ *E-mail: ${profile.Email}*\n★ *Website: ${profile.website}*\n★ *Desc*: ${profile.description}\n★ Address: ${profile.address}`)
});
