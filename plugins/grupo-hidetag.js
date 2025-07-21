let handler = async (m, { conn, text }) => {
  if (!m.isGroup) return conn.reply(m.chat, '❌ Solo en grupos.', m);
  if (!m.isGroupAdmins) return conn.reply(m.chat, '❌ Solo admins pueden usar este comando.', m);
  if (!text) return conn.reply(m.chat, '❌ Envía un mensaje para ocultar el texto y mencionar a todos.', m);

  let metadata = await conn.groupMetadata(m.chat);
  let mentions = metadata.participants.map(u => u.id);

  await conn.sendMessage(m.chat, { text: text, mentions: mentions }, { quoted: m });
};
handler.command = /^hidetag$/i;
handler.group = true;
handler.admin = true;

export default handler;
