let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');
  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = groupMetadata.participants.map(u => u.id);
  let text = `🔔 *Etiquetando a todos los miembros (${participants.length})*\n\n`;

  for (let i = 0; i < participants.length; i++) {
    text += `@${participants[i].split('@')[0]} `;
  }

  await conn.sendMessage(m.chat, { text, mentions: participants }, { quoted: m });
};
handler.command = /^(tagall|todos)$/i;
handler.group = true;
handler.admin = true;
export default handler;
