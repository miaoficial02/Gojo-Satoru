const handler = async (m, { conn }) => {
  if (!m.isGroup) return conn.reply(m.chat, '❌ Solo funciona en grupos.', m);
  if (!m.isGroupAdmins) return conn.reply(m.chat, '❌ Solo admins pueden usar este comando.', m);

  try {
    await conn.groupSettingUpdate(m.chat, 'not_announcement'); // Permitir enviar mensajes a todos
    conn.reply(m.chat, '✅', m);
  } catch (e) {
    conn.reply(m.chat, '❌', m);
  }
};

handler.command = /^open$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
