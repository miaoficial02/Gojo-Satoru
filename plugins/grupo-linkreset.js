const handler = async (m, { conn }) => {
  if (!m.isGroup) return conn.reply(m.chat, '❌ Solo en grupos.', m);
  if (!m.isGroupAdmins) return conn.reply(m.chat, '❌ Solo admins pueden usar este comando.', m);

  try {
    const newInvite = await conn.groupRevokeInvite(m.chat);
    const link = `https://chat.whatsapp.com/${newInvite}`;
    conn.reply(m.chat, `🔗 Enlace de invitación reseteado:\n${link}`, m);
  } catch {
    conn.reply(m.chat, '❌ No pude resetear el enlace.', m);
  }
};

handler.command = /^linkreset$/i;
handler.group = true;
handler.admin = true;

export default handler;
