let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');
  if (!conn.user.jid.endsWith('@g.us')) return m.reply('❌ El bot debe ser admin.');

  const metadata = await conn.groupMetadata(m.chat);
  const admins = metadata.participants.filter(u => u.admin !== null).map(u => u.id);
  const usersToKick = metadata.participants
    .filter(u => !admins.includes(u.id) && u.id !== conn.user.jid)
    .map(u => u.id);

  if (usersToKick.length === 0) return m.reply('❌ No hay usuarios para expulsar.');

  try {
    await conn.groupParticipantsUpdate(m.chat, usersToKick, 'remove');
    m.reply(`✅ Se expulsaron a ${usersToKick.length} usuarios.`);
  } catch (e) {
    m.reply('❌ Error al expulsar usuarios.');
  }
};
handler.command = /^(kickall|expulsartodos)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
