const handler = async (m, { conn }) => {
  if (!m.isGroup) return conn.reply(m.chat, '❌ Solo funciona en grupos.', m);
  if (!m.isGroupAdmins) return conn.reply(m.chat, '❌ Solo admins pueden usar este comando.', m);

  try {
    await conn.groupSettingUpdate(m.chat, 'announcement'); // Solo admins pueden enviar mensajes
    conn.reply(m.chat, '✅', m);
  } catch (e) {
    conn.reply(m.chat, '❌', m);
  }
};

handler.command = /^close$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
