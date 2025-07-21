let handler = async (m, { conn, args }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');
  if (!conn.user.jid.endsWith('@g.us')) return m.reply('❌ El bot debe ser admin.');

  const desc = args.join(' ');
  if (!desc) return m.reply('❌ Escribe la nueva descripción.');

  try {
    await conn.groupUpdateDescription(m.chat, desc);
    m.reply('✅ Descripción del grupo actualizada.');
  } catch (e) {
    m.reply('❌ No pude cambiar la descripción.');
  }
};
handler.command = /^(setdesc|descripcion)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
