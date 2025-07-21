let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');

  try {
    const inviteCode = await conn.groupInviteCode(m.chat);
    const link = 'https://chat.whatsapp.com/' + inviteCode;
    m.reply(`🔗 Link del grupo:\n${link}`);
  } catch (e) {
    m.reply('❌ No pude obtener el enlace del grupo.');
  }
};
handler.command = /^(linkgc|linkgrupo|enlace)$/i;
handler.group = true;
handler.admin = true;
export default handler;
