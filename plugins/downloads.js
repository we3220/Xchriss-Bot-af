const { cmd, isUrl, fetchJson } = require("../lib")
const fs = require("fs")
const axios = require("axios")
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const { githubstalk } = require("../lib/ghstalk")
const Index = cmd
const { BOT_NAME } = require("../config")

Index({
     pattern: "tiktok",
     alias: ["tt", "ttdl"],
     react: "☃️",
     desc: "Download tt vid",
     category: "download",
     filename: __filename
}, async (conn, message, args) => {
    try {
    	let q = message.args
        if (!q) return message.reply("Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return message.reply("Invalid TikTok link.");
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        let mssg =  `
    *[ TIKTOK DOWNLOADER ]*
    *ᴜsᴇʀ: *${author.nickname}`
    *ʟɪᴋᴇs:* ${like}
    *sʜᴀʀᴇs:* ${share}

    > ${BOT_NAME}
    `
        await conn.sendMessage(message.jid, {
            video: { url: videoUrl },
            caption: mssg,
            contextInfo: { mentionedJid: [message.sender]}
        }, { quoted: message.card });
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});


Index({ 
     pattern: "play", 
     alias: ["yta", "ytmp3"], 
     react: "🎶", 
     desc: "Download Youtube song",
     category: "download", 
     filename: __filename 
}, async (conn, message, args) => {
     try {
     if (!message.args) return await message.reply("*𝐏lease providea YouTube url or Song Name.*");
	const yt = await ytsearch(q);
    if (yt.results.length < 1) return reply("No results found!");
    let yts = yt.results[0];
    let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
        return reply("Failed to fetch the audio. Please try again later.");
    }

	let mssg =  `
    *[ ${yts.title} ]*
    *ᴅᴜʀᴀᴛɪᴏɴ:* ${yts.timestamp}
    *ᴀᴜᴛʜᴏʀ:* ${yts.author.name}
    *sᴏᴜʀᴄᴇ:* ${yts.url}

    > ${BOT_NAME}
    `

    await conn.sendMessage(message.jid, { image: { url: data.result.image || '' }, caption: mssg, contextInfo: { mentionedJid: [message.sender]}, { quoted: message.card });
    await conn.sendMessage(message.jid, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: message.card });
} catch (e) {
    console.log(e);
    message.reply("An error occurred. Please try again later.");
}
});


Index({
    pattern: "define",
    desc: "Get the definition of a word from Urban Dictionary",
    category: "info"
}, async (conn, message, args) => {
        let text = message.args
        if (!text) return message.reply("Provide a word!");
        try {
            const response = await axios.get(`http://api.urbandictionary.com/v0/define?term=${text}`);
            const definitions = response.data.list;
            if (!definitions.length) return m.reply(`No definition found for *${text}*`);
            const result = `
*📖 Word:* ${text}
*📌 Definition:* ${definitions[0].definition.replace(//g, "").replace(//g, "")}
*📝 Example:* ${definitions[0].example.replace(//g, "").replace(//g, "")}
            `;
            await conn.sendMessage(message.jid, { text: result }, { quoted: message.card });
        } catch (error) {
            console.error(error);
            return message.reply(`Error fetching definition for *${text}*`);
        }
});

Index({
  pattern: 'sticker',
  alias: ["s", "take", "steal"],
  desc: 'Download and convert Telegram sticker packs to WhatsApp stickers',
  category: 'downloads',
  filename: __filename
}, async (conn, message, args) => {
  try {
          if (!message.quoted) return message.reply(`*Reply to an image or video.*`);
            let mime = message.quoted.mtype
            pack = BOT_NAME
            author = message.args ? message.args : message.pushName
            if (message.quoted) {
                let media = await message.quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack,
                    author: author,
                    type: message.args.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"],
                    id: "12345",
                    quality: 75,
                    background: "transparent",
                });
                const buffer = await sticker.toBuffer();
                return conn.sendMessage(message.jid, { sticker: buffer }, {quoted: message.card });
	  } else if (/video/.test(mime)) {
	            const quoted = message.quoted ? message.quoted : message
                if ((quoted.msg || message.quoted).seconds > 20) return message.reply("Cannot fetch videos longer than *20 Seconds*");
                let media = await message.quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack,
                    author: author,
                    type: StickerTypes.FULL,
                    categories: ["🤩", "🎉"],
                    id: "12345",
                    quality: 70,
                    background: "transparent",
                });
                const stikk = await sticker.toBuffer();
                return conn.sendMessage(message.jid, { sticker: stikk }, {    quoted: message.card });
            } else {
                message.reply("*Uhh,Please reply to any image or video*");
	}
  } catch (error) {
    console.error('Error processing sticker command:', error);
    message.reply('An error occurred while processing the sticker. Please try again.');
  }
});
  
Index({
  pattern: 'telestick',
  alias: "tgs",
  desc: 'Download and convert Telegram sticker packs to WhatsApp stickers',
  category: 'downloads',
  filename: __filename
}, async (conn, message, args) => {
  try {
    let args = message.args
    if (!args) return message.reply('provide a Telegram sticker pack link.\n\n Example `.telestick` https://t.me/addstickers/telegram ');
    const lien = args.join(' ');
    const name = lien.split('/addstickers/')[1];
    if (!name) return message.reply('Invalid Telegram sticker link.');
    const api = `https://api.telegram.org/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/getStickerSet?name=${encodeURIComponent(name)}`;
    const stickers = await axios.get(api);
    let type = stickers.data.result.is_animated ? 'animated sticker' : 'not animated sticker';

    let mssg = `*TELEGRAM STICKER*\n\n` +
                  `*Producer:* ${stickers.data.result.name}\n` +
                  `*Type:* ${type}\n` +
                  `*Length:* ${stickers.data.result.stickers.length}\n\n` +
                  `> Please wait...`;
await message.reply(mssg)
    for (let i = 0; i < stickers.data.result.stickers.length; i++) {
      const file = await axios.get(`https://api.telegram.org/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/getFile?file_id=${stickers.data.result.stickers[i].file_id}`);

      const buffer = await axios({
        method: 'get',
        url: `https://api.telegram.org/file/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/${file.data.result.file_path}`,
        responseType: 'arraybuffer',
      });
      const sticker = new Sticker(buffer.data, {
        pack: BOT_NAME,
        author: message.pushName,
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });
      const stickerBuffer = await sticker.toBuffer();
      await conn.sendMessage(
        message.jid,
        { sticker: stickerBuffer },
        { quoted: message.card }
      );
      //delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    message.reply('Sticker pack download complete!');
  } catch (error) {
    console.error('Error processing Telegram sticker pack:', error);
    message.reply('An error occurred while processing the sticker pack. Please try again.');
  }
});


Index({
	pattern: 'play',
	desc: 'play',
	category: 'downloads'
}, async (conn, message, args) => {
try {
       if (!message.args) return message.reply("*_provide a song name*_ ");
    let text = message.args
    let card = message.card
        let kyuu = await fetchJson (`https://api.agtz.xyz/api/ytsearch?message=${encodeURIComponent(text)}`);
        let tylor = await fetchJson (`https://api.agtz.xyz/api/ytmp3?url=${kyuu.data[0].url}`);
      await conn.sendMessage(message.jid, {
         audio: { url: tylor.data[0].downloadUrl },
         fileName: `${tylor.data[0].title}.mp3`,
         mimetype: "audio/mpeg",
         contextInfo: {
             externalAdReply: {
             title: `✞Xᴄʜʀɪss Bot✞`,
             body: `${tylor.data[0].title}.mp3`,
             thumbnailUrl: `https://ibb.co/y5XNPLH`,
          sourceUrl: `https://t.me/Tha_Healer`,
          mediaType: 2,
          showAdAttribution: true,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: card });
} catch (error) {
    message.reply(error.toString())
}
});


Index({
	pattern: 'gitclone',
	desc: 'Git clone',
	category: 'downloads'
}, async (conn, message, args) => {
try {
        if (!message.args) {
          return message.reply(`Please provide the GitHub repository link.\nExample:\n\t .gitclone https://github.com/anonphoenix007/Xchriss-Bot`);
        }
    let card = message.card
        if (!isUrl(message.args) || !message.args.includes('github.com')) {
          return message.reply(`Invalid or non-GitHub repository link provided. Please use a valid GitHub repository link.`);
        }
        try {
          let splitURL = message.args.split('github.com/');
          if (splitURL.length < 2) throw Error('Invalid GitHub URL');
          let [githubUser, githubRepo] = splitURL[1].split('/');
          githubRepo = githubRepo.replace('.git', '');
          let gitZipUrl = `https://api.github.com/repos/${githubUser}/${githubRepo}/zipball`;
          await conn.sendMessage(message.jid, { text: `Please wait, downloading...` });
          let zipHeaders = await fetch(gitZipUrl, { method: 'HEAD' }).then(res => res.headers);
          let zipFilename = zipHeaders.get('content-disposition').match(/attachment; filename=(.*)/)[1];
          await conn.sendMessage(message.jid, { document: { url: gitZipUrl }, fileName: zipFilename, mimetype: 'application/zip' }, { quoted: card });
        } catch (err) {
          console.error(err);
          return message.reply(`Failed to fetch the repository contents. Please ensure the GitHub link is correct and accessible. Use the format: 'https://github.com/username/repository'.`);
    }
} catch (error) {
    message.reply(error.toString())
}
});



Index({
	pattern: 'ghstalk',
	desc: 'github stalk',
	category: 'info'
}, async (conn, message, args) => {
try {
        if (!message.args) return message.reply(`Give me a user name like *.github anonphoenix007*`)
        gitdata = await githubstalk(`${message.args}`)
        conn.sendMessage(message.jid, {
          image: { url: "https://raw.githubusercontent.com/anonphoenix007/storage/main/logo.jpg" }, caption:
            `*ㅤㅤㅤ|ㅤㅤㅤGithub Info ㅤㅤㅤ|\*

  🚩 Id : ${gitdata.id}
  🔖 Nickname : ${gitdata.nickname}
  🔖 Username : ${gitdata.username}
  ✨ Bio : ${gitdata.bio}
  🏢 Company : ${gitdata.company}
  📍 Location : ${gitdata.location}
  📧 Email : ${gitdata.email}
  🔓 Public Repo : ${gitdata.public_repo}
  🔐 Public Gists : ${gitdata.public_gists}
  💕 Followers : ${gitdata.followers}
  👉 Following : ${gitdata.following}`
        }, { quoted: message.card })
} catch (error) {
    message.reply(error.toString())
}
});

Index({
    pattern: "videourl",
    desc:"send mp4 from url",
    category: "downloads"
}, async (conn, message, args) => {
try {
const args = message.args
    if (!args) return message.reply("_Provide a direct video link_")
    let card = message.card
    await conn.sendMessage(message.jid, {
                 video: {
                     url: args.split(" ")[0],
                 },
                 caption: "*HERE WE GO*",
                 contextInfo: {
                     externalAdReply: {
                         title: BOT_NAME,
                         body: `${message.pushName}`,
                         thumbnail: "",
                         mediaType: 2,
                         mediaUrl: ``,
                         sourceUrl: ``,
                     },
                 },
             }, {
                 quoted: card,
             });
} catch (error) {
    message.reply(error.toString())
}
})
