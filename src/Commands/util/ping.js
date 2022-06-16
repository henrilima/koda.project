module.exports = {
    name: "ping",
    aliases: ["pong", "status"],
    execute (message, args) {
        let ramPercent =
            Math.round(
                (Math.round(
                    (process.memoryUsage().heapUsed / 1024 / 1024) * 10
                ) /
                    10 /
                    512) *
                    1000
            ) / 10;

        let days = Math.floor(global.koda.uptime / 86400000);
        let hours = Math.floor(global.koda.uptime / 3600000) % 24;
        let minutes = Math.floor(global.koda.uptime / 60000) % 60;
        let seconds = Math.floor(global.koda.uptime / 1000) % 60;

        let embed = new global.koda.discord.MessageEmbed()
            .setTitle(`📡 | Informations`)
            .setColor(global.koda.color)
            .setDescription(`
  **O ping da API é de:** \`${global.koda.ws.ping}ms\`.
  **Uso de RAM:** \`${ramPercent}%\`.
  **Uptime:** \`${days !== 0 ? `${days} dias, ` : ''}${hours !== 0 ? `${hours} horas, ` : ''}${minutes !== 0 ? `${minutes} minuto(s) e ` : ''}${seconds} segundos\`.
  `);

        message.reply({
            embeds: [embed]
        });
    },
}