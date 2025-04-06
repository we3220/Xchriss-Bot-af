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
   sudo.push(user)
   fs.writeFileSync(path.resolve(__dirname, '../lib/sudo.json'), JSON.stringify(sudo))
   await message.reply(`${user} Has Been given Sudo Access`)
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
await message.reply(`${user} Has Been Deleted from Sudo users.`)
});

Index({
    pattern: 'getsudo',
    desc: 'get sudo',
    category: 'owner',
    filename: __filename
}, async (conn, message, args) => {
  if (!message.isCreator) return message.reply("_Command is for bot owner only")
  let txt = `*------「 Bot Sudo 」------*\n\n`
  txt += sudo
  await message.reply(txt)
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
