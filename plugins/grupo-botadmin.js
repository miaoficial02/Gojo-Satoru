const handler = async (m, { conn }) => {
  if (!m.isGroup) return conn.reply(m.chat, '❌ Solo en grupos.', m);

  const metadata = await conn.groupMetadata(m.chat);
  const botId = conn.user.jid;
  const isAdmin = metadata.participants.some(p => p.id === botId && p.admin !== null);

  conn.reply(m.chat, isAdmin ? '✅ Soy admin en este grupo.' : '❌ No soy admin en este grupo.', m);
};

handler.command = /^botadmin$/i;
handler.group = true;

export default handler;
