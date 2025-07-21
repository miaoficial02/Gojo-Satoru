let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Solo funciona en grupos.');

  try {
    const metadata = await conn.groupMetadata(m.chat);
    const participants = metadata.participants.length;
    const desc = metadata.desc || 'Sin descripción';
    const texto = `📌 *Nombre:* ${metadata.subject}\n📝 *Descripción:* ${desc}\n👥 *Participantes:* ${participants}`;
    m.reply(texto);
  } catch (e) {
    m.reply('❌ No pude obtener la información del grupo.');
  }
};
handler.command = /^(infogrupo|groupinfo|info)$/i;
handler.group = true;
export default handler;
