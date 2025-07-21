let handler = async (m, { conn, args }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');
  if (!conn.user.jid.endsWith('@g.us')) return m.reply('❌ El bot debe ser admin.');

  const name = args.join(' ');
  if (!name) return m.reply('❌ Escribe el nuevo nombre del grupo.');

  try {
    await conn.groupUpdateSubject(m.chat, name);
    m.reply('✅ Nombre del grupo actualizado.');
  } catch (e) {
    m.reply('❌ No pude cambiar el nombre del grupo.');
  }
};
handler.command = /^(setname|nombregc)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
