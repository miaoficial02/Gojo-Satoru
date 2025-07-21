let handler = async (m, { conn, args }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');
  if (!conn.user.jid.endsWith('@g.us')) return m.reply('❌ El bot debe ser admin.');

  const user = args[0];
  if (!user) return m.reply('❌ Escribe el número completo del usuario a agregar (ej: 5491123456789).');

  try {
    await conn.groupParticipantsUpdate(m.chat, [user + '@s.whatsapp.net'], 'add');
    m.reply('✅ Usuario agregado correctamente.');
  } catch (e) {
    m.reply('❌ No pude agregar al usuario, puede que tenga configurado no ser agregado.');
  }
};
handler.command = /^(add|invitar)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
