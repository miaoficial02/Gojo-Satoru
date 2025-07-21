let handler = async (m, { conn, args }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');
  if (!conn.user.jid.endsWith('@g.us')) return m.reply('❌ El bot debe ser admin.');

  const user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0];
  if (!user) return m.reply('❌ Menciona o escribe el número del usuario a promover.');

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    m.reply('✅ Usuario promovido a admin.');
  } catch (e) {
    m.reply('❌ No pude promover al usuario.');
  }
};
handler.command = /^(promote|promover)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
