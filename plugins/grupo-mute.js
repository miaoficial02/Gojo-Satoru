let handler = async (m, { conn, args }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');
  if (!conn.user.jid.endsWith('@g.us')) return m.reply('❌ El bot debe ser admin.');

  const action = args[0] && args[0].toLowerCase();
  if (!['on', 'off'].includes(action)) return m.reply('❌ Usa: #mute on o #mute off');

  try {
    if (action === 'on') {
      await conn.groupSettingUpdate(m.chat, 'announcement');
      m.reply('🔇 Grupo silenciado, solo admins pueden enviar mensajes.');
    } else {
      await conn.groupSettingUpdate(m.chat, 'not_announcement');
      m.reply('🔊 Grupo activado, todos pueden enviar mensajes.');
    }
  } catch (e) {
    m.reply('❌ No pude cambiar la configuración del grupo.');
  }
};
handler.command = /^mute$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
