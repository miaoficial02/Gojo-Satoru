let handler = async (m, { conn }) => {
  if (!m.isGroup) return conn.reply(m.chat, '❌ Solo en grupos.', m);
  if (!m.isGroupAdmins) return conn.reply(m.chat, '❌ Solo admins pueden usar este comando.', m);

  try {
    await conn.groupLeave(m.chat);
  } catch {
    conn.reply(m.chat, '❌ No pude salir del grupo.', m);
  }
};
handler.command = /^leave$/i;
handler.group = true;
handler.admin = true;

export default handler;
