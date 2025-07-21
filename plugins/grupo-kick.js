let handler = async (m, { conn, participants, args }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');
  if (!conn.user.jid.endsWith('@g.us')) return m.reply('❌ El bot debe ser admin.');

  const user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0];
  if (!user) return m.reply('❌ Menciona o escribe el número del usuario a expulsar.');

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    m.reply(`✅ Usuario expulsado correctamente.`);
  } catch (e) {
    m.reply(`❌ No pude expulsar al usuario, revisa que soy admin y que el usuario esté en el grupo.`);
  }
};
handler.command = /^(kick)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
