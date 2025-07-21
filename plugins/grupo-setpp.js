let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');
  if (!m.isGroupAdmins) return m.reply('❌ Solo admins pueden usar este comando.');
  if (!conn.user.jid.endsWith('@g.us')) return m.reply('❌ El bot debe ser admin.');

  if (!m.quoted || !m.quoted.fileLength) return m.reply('❌ Responde a una imagen para cambiar la foto del grupo.');

  try {
    const img = await m.quoted.download();
    await conn.updateProfilePicture(m.chat, img);
    m.reply('✅ Foto de perfil del grupo actualizada.');
  } catch (e) {
    m.reply('❌ No pude cambiar la foto del grupo.');
  }
};
handler.command = /^(setppgc|setfotogc)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
