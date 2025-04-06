const { cmd, sleep, getAdmin } = require('../lib');
const { HANDLERS } = require("../config")
const config = require("../config")
const fs = require("fs")
const path = require("path")
const rept = JSON.parse(fs.readFileSync(path.resolve(__dirname, './media/ban.json')))
const Index = cmd

Index({
	pattern: 'addban',
	desc: 'Add user to banned list',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
try {
   if (!message.isGroup) return message.reply("This command is for groups only")
   if (!message.isCreator) return message.reply("*_This command is for owner only_*")
   let first = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
   if (!first) return message.reply("_*Reply/Tag or provide a number*_")
   rept.push(first)
   fs.writeFileSync(path.resolve(__dirname, './media/ban.json'), JSON.stringify(rept))
await message.reply(`${first} Will not be able to send messages now.`)
} catch (error) {
    message.reply(error.toString())
}
});


Index({
	pattern: 'delban',
	desc: 'delete user from banned users list.',
	category: 'owner',
	filename: __filename
}, async (conn, message, args) => {
try {
   if (!message.isGroup) return message.reply("This command is for groups only")
   if (!message.isCreator) return message.reply("*_This command is for owner only_*")
    let first = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
   if (!first) return message.reply("_*Reply/Tag or provide a number*_")
      if (rept.includes(first)) return message.reply("*_User is not on the list*_")
   let fin = rept.indexOf(first)
   rept.splice(fin, 1)
   fs.writeFileSync(path.resolve(__dirname, './media/ban.json'), JSON.stringify(rept))
await message.reply(`${first} Has Been Deleted from banned users list.`)
} catch (error) {
    message.reply(error.toString())
}
});


Index({
	pattern: 'del',
	alias: ["dlt", "delete"],
	desc: 'delete message as admin',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isCreator) return message.reply("Only the owner can use this command.")
    if (!message.quoted) return message.reply("Reply to a message!")
    message.quoted.delete()
} catch (error) {
    message.reply(error.toString())
}
});


Index({
	pattern: 'savecontact',
	desc: 'gc vcard',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
   try {
   if (!message.isGroup) return message.reply("This command is for groups only")
   if (!message.isCreator) return message.reply("*_This command is for owner only_*")
   let card = message.card
let cmiggc = await conn.groupMetadata(message.jid)
const { participants } = await conn.groupMetadata(message.jid);
let orgiggc = participants.map(a => a.id)
vcard = ''
noPort = 0
for (let a of cmiggc.participants) {
    vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`
}
let nmfilect = './contacts.vcf'
message.reply('Saving  ' + cmiggc.participants.length+' participants contact')
require('fs').writeFileSync(nmfilect, vcard.trim())
await sleep(2000)
await conn.sendMessage(message.jid,{
    document: require('fs').readFileSync(nmfilect), mimetype: 'text/vcard', fileName: 'Xchriss.vcf', caption: '\nDone saving.\nGroup Name: *'+cmiggc.subject+'*\nContacts: *'+cmiggc.participants.length+'*'
}, {ephemeralExpiration: 86400, quoted: card })
require('fs').unlinkSync(nmfilect)
} catch (err) {
    message.reply(err.toString())
 }
});


Index({
	pattern: 'left',
	desc: 'To exit gc',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isCreator) return message.reply("_Only bot owner can use this command_")
    if (!message.isGroup) return message.reply("This command is for groups only") 
    await message.reply("Bye")
    await conn.groupLeave(message.jid)
} catch (error) {
    message.reply(error.toString())
}
});


Index({
	pattern: 'lock',
	desc: 'lock group settings',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
	 conn.groupSettingUpdate(message.jid, 'locked').then((res) => message.reply(`Group settings has been successfully locked!`)).catch((err) => message.reply(jsonformat(err)))
} catch (error) {
    message.reply(error.toString())
}
});  


Index({
	pattern: 'unlock',
	desc: 'unlock group settings ',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
	 conn.groupSettingUpdate(message.jid, 'unlocked').then((res) => message.reply(`Group settings has been successfully unlocked!`)).catch((err) => message.reply(jsonformat(err)))
} catch (error) {
    message.reply(error.toString())
}
});  


Index({
	pattern: 'join',
	desc: 'join group',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
      if (!message.args) return message.reply(`_provide a group link please_`)   
        if (!message.args.split(" ")[0] && !message.args.split(" ")[0].includes("whatsapp.com"))
                message.reply("_Link Invalid, provide a valid whatsapp Group Link!_");
            let result = message.args.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await conn.groupAcceptInvite(result)
await message.reply("_Group Successfully Joined or wait for admin approval_")
} catch (error) {
    message.reply(error.toString())
}
});


Index({
	pattern: 'gdesc',
	desc: 'set gc desc',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
  try {
      if (!message.args) return message.reply('use .gdesc <New Group desc>')
    await conn.groupUpdateDescription(message.jid, message.args) 
  await message.reply("Group descriptions successfully updated ✅")
  } catch (err) {
    message.reply(err.toString())
  }
});

Index({
	pattern: 'gname',
	desc: 'Change group name',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
 try {
    if (!message.args) return message.reply('use .gname <New Group Name>')
        await conn.groupUpdateSubject(message.jid, message.args)
        await message.reply("Group name successfully updated ✅")
 } catch (err) {
   message.reply(err.toString())
 }
});

Index({
    pattern: "wa",
    desc:"wame",
    category: "group",
	filename: __filename
    }, async (conn, message, args) => {
try {
    let users = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
    if (!users) return message.reply("_Reply/tag a user")
    await message.reply(`https://wa.me/${users.split("@")[0]}`)
} catch (error) {
    message.reply(error.toString())
}
})

Index({
	pattern: 'mute',
	desc: 'Mute group',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
	await conn.groupSettingUpdate(message.jid, 'announcement').then((res) => message.reply(`Group has been successfully closed!`)).catch((err) => message.reply(jsonformat(err)))
} catch (error) {
    message.reply(error.toString())
}
});    


Index({
	pattern: 'unmute',
	desc: 'Unmute group',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
     if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
	await conn.groupSettingUpdate(message.jid, 'not_announcement').then((res) => message.reply(`Group has been successfully Opened!`)).catch((err) => message.reply(jsonformat(err)))
} catch (error) {
    message.reply(error.toString())
}
});  


Index({
	pattern: 'promote',
	desc: 'Promote a user',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
     if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
   let users = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
	if (!users) return message.reply("reply/tag a user to promote")        
	await conn.groupParticipantsUpdate(message.jid, [users], 'promote')
	await message.reply(`User promoted successfully`) 
} catch (error) {
    message.reply(error.toString())
}
});      
    
    
 Index({
	pattern: 'demote',
	desc: 'demote a user',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
     if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
    let users = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
	if (!users) return message.reply("reply/tag a user to demote")        
	await conn.groupParticipantsUpdate(message.jid, [users], 'demote')
	await message.reply(`User demoted successfully`) 
} catch (error) {
    message.reply(error.toString())
}
});      
    
    
Index({
	pattern: 'kick',
	desc: 'kick a user',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
    let users = message.quoted ? message.quoted.sender : message.args.replace(/[^0-9]/g, '' + "@s.whatsapp.net")
	if (!users) return message.reply("reply/tag a user to kick ")
	await conn.groupParticipantsUpdate(message.jid, [users], 'remove')
	await message.reply(`User Kicked successfully`)
} catch (error) {
    message.reply(error.toString())
}
});      


Index({
	pattern: 'add',
	desc: 'add a user',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
        let users = message.quoted ? message.quoted.sender : match.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        if (users.length == 0) return message.reply(`Please write the number of the person you want to add to thhis group`)
	if (!users) return message.reply("reply/provide a user to add")        
	await conn.groupParticipantsUpdate(message.jid, [users], 'add')
	await message.reply(`User Added successfully`) 
} catch (error) {
    message.reply(error.toString())
}
});      


Index({
	pattern: 'inviteuser',
	desc: 'invite a number',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
     if (!message.args) return message.reply("Provide a number to send invitation to!")
	 if (message.args.includes('+')) return message.reply(`Enter the number together without *+*`)
     let users = message.args.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
     if (users.length == 0) return reply(`Please write the number of the person you want to add to this group`)
	if (!users) return message.reply("reply/provide a user to send invite link to.")        
	let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(message.jid)
	await conn.sendMessage(users, { text: ` *GROUP INVITATION*\n\nA user invites you to join this group \n\n${link}`, mentions: [message.sender] })
	await message.reply(`Successfully sent invite link to the user.`) 
} catch (error) {
    message.reply(error.toString())
}
});      


Index({
	pattern: 'invite',
	desc: 'Send invite Link of group.r',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
	let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(message.jid)
	await message.reply(`Group link below 👇\n\n ${link}.`) 
} catch (error) {
    message.reply(error.toString())
}
});      


Index({
	pattern: 'kickall',
	desc: 'Kick all in gc',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
	var { participants } = message.isGroup ? await conn.groupMetadata(message.jid) : null
	let all = participants.map(a => a.id)
	await message.reply("Kicking all members in current group....")
        for (let member of all) {
          conn.groupParticipantsUpdate(message.jid, [member], 'remove')
     }
} catch (error) {
    message.reply(error.toString())
}
});      
    
    
Index({
   pattern: "rejectall",
   alias: ["rejectjoin", "reject"],
   info: "reject all request to join!",
   category: "group",
   filename: __filename
 }, async (conn, message, args) => {
   try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
     const reqs = await conn.groupRequestParticipantsList(message.jid);
     if (!reqs || !reqs[0]) {
       return await message.reply("*_No Request Join Yet_*");
     }
     let reqs2 = [];
     let mssg = "*List of rejected users*\n\n";
     for (let i = 0; i < reqs.length; i++) {
       try {
         await conn.groupRequestParticipantsUpdate(message.jid, [reqs[i].jid], "reject");
         mssg += "@" + reqs[i].jid.split("@")[0] + "\n";
         reqs2 = [...reqs2, reqs[i].jid];
       } catch {}
     }
     await conn.sendMessage(message.jid, {
       text: mssg,
       mentions: [reqs2]
     });
   } catch (err) {
     await message.reply(err.toString());
   }
 });
 Index({
   pattern: "acceptall",
   alias: ["acceptjoin", "accept"],
   desc: "accept all request to join!",
   category: "group",
   filename: __filename
 }, async (conn, message, args) => {
   try {
       if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
     const total = await conn.groupRequestParticipantsList(message.jid);
     if (!total || !total[0]) {
       return await message.reply("*_No Join Request Yet_*");
     }
     let reqs2 = [];
     let mssg = "*List of accepted users*\n\n";
     for (let i = 0; i < total.length; i++) {
       try {
         await conn.groupRequestParticipantsUpdate(message.jid, [total[i].jid], "approve");
         mssg += "@" + total[i].jid.split("@")[0] + "\n";
         reqs2 = [...reqs2, total[i].jid];
       } catch {}
     }
    await conn.sendMessage(message.jid, {
       text: mssg,
       mentions: [reqs2]
     });
   } catch (err) {
     await message.reply(err.toString());
   }
 });
 Index({
   pattern: "listrequest",
   alias: ["requestjoin", "requests"],
   desc: "Set Description of Group",
   category: "group",
   filename: __filename
 }, async (conn, message, args) => {
   try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
     const total = await conn.groupRequestParticipantsList(message.jid);
     if (!total || !total[0]) {
       return await message.reply("*_No Request Join Yet_*");
     }
     let reqs2 = [];
     let mssg = "*List of User Request to join*\n\n";
     for (let i = 0; i < total.length; i++) {
       mssg += "@" + total[i].jid.split("@")[0] + "\n";
       reqs2 = [...reqs2, total[i].jid];
     }
     await conn.sendMessage(message.jid, {
       text: mssg,
       mentions: [reqs2]
     });
   } catch (err) {
     await message.reply(err.toString());
   }
 });
 
 
 Index({
	pattern: 'revoke',
	desc: 'revoke group link',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
	conn.groupRevokeInvite(message.jid)
	await message.reply("Group link revoked, Copy new link from group settings....!")
} catch (error) {
    message.reply(error.toString())
}
});      


Index({
	pattern: 'tag',
	desc: 'Tag',
	category: 'group',
	filename: __filename
}, async (conn, message, args) => {
try {
    if (!message.isGroup) return message.reply("This command is for groups only")
	if (!message.isCreator) return await message.reply("Only the owner can use this command.")
    //if (!message.args) return message.reply("_Provide a text._")
    var { participants } = message.isGroup ? await conn.groupMetadata(message.jid) : null
    await conn.sendMessage(message.jid, { text: message.args ? message.args : message.quoted ? message.quoted.text : "", mentions: participants.map(a => a.id) }, { quoted: message.card })
} catch (error) {
    message.reply(error.toString())
}
 })


Index({
    pattern: "tagall",
    desc: "mention all users in group",
    category: "group",
	filename: __filename
}, async (conn, message, args) => {
  try {
    if (!message.isGroup) return message.reply("This command is for groups only")
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
	 if (!isBotAdmins) return await message.reply("I'm not an admin")
     if (!isAdmins) return message.reply("You need to be an admin to use this command ⁉️")
     var { participants } = message.isGroup ? await conn.groupMetadata(message.jid) : null
     let msg = message.args ? message.args : "" + `\n`
    let messg = config.BOT_NAME + `\n`;
    messg += "*Message:* " + msg + `\n`
    for (let mem of participants) {
      messg += `𒍟\t @${mem.id.split("@")[0]}\n`;
    }
    conn.sendMessage(message.jid, { text: messg.trim(),
      mentions: participants.map((a) => a.id),
    }, { quoted: message.card });
} catch (error) {
    message.reply(error.toString())
}
});

Index({ on: "alink"}, async(conn, message,  args) => {
  try {
    const groupAdmins = await getAdmin(conn, message)
    const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    const isAdmins = message.isGroup ? groupAdmins.includes(message.sender) : false;
     if (config.ANTILINK && isBotAdmins && message.text.includes('http://') || message.text.includes('https://') || message.text.includes('.com') || message.text.includes('.net') || message.text.includes('.org')) {

  const txt = `*_${message.pushName} detected sending a link..._*`;
  if (!message.isGroup) return
  if (isAdmins) return;
  if (message.key.fromMe) return;
  if (message.isCreator) return;
  await message.reply(txt)
     await conn.sendMessage(message.jid, {
    delete: {
      remoteJid: message.jid,
      fromMe: false,
      id: message.id,
      participant: message.participant
    }
  });
      await conn.groupParticipantsUpdate(message.jid, [message.sender], 'remove');
         
     }
  } catch (err) {
    message.reply(err.toString())
    }
})


Index({ on: "body" }, async(conn, message, args) => {
     if (message.text.startsWith(".") || message.text.startsWith("!") || message.text.startsWith(",")) {
         const emojiSet= ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const rand = emojiSet[Math.floor(Math.random() * (emojiSet.length))]
         conn.sendMessage(message.jid, {
             react: {
                 text: rand,
                 key: message.key
             }
         })
     }
 })
    
 
Index({ on: "dlt" }, async(conn, message, args) => {
try {
     const groupAdmins = await getAdmin(conn, message)
     const isBotAdmins = message.isGroup ? groupAdmins.includes(message.botNumber) : false;
    if (message.message && message.isGroup) {
     const isDelete = rept.includes(message.sender)
        if (message.isGroup && isBotAdmins && isDelete) {
          const key = {
              remoteJid: message.jid,
              fromMe: false,
              id: message.id,
             participant: message.participant
           }
                await conn.sendMessage(message.jid, { delete: key })
      }
    }
} catch (error) {
    message.reply(error.toString())
}
 })
