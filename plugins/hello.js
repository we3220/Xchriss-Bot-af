const { cmd } = require('../lib');

cmd({
  pattern: 'hello',
  desc: 'Says hello',
  category: 'misc',
  filename: __filename,
}, async (conn, message, args) => {
  await message.reply('Hello!');
});
