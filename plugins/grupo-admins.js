let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');

  const metadata = await conn.groupMetadata(m.chat);
  const admins = metadata.participants.filter(u => u.admin !== null);
  if (admins.length === 0) return m.reply('No se encontraron admins.');

  let texto = '👑 *Admins del grupo:*\n\n';
  admins.forEach((admin, i) => {
    texto += `*${i + 1}.* @${admin.id.split('@')[0]}\n`;
  });

  await conn.sendMessage(m.chat, { text: texto, mentions: admins.map(a => a.id) }, { quoted: m });
};
handler.command = /^(listadmins|admins)$/i;
handler.group = true;
export default handler;
