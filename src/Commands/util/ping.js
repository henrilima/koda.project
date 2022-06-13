module.exports = {
    name: "ping",
    aliases: ["status"],
    category: "utilidade",
    description: "Veja minha latência, ram, shards e uptime",
    async execute(message, args) {
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
            .setTitle(`📡 | Infos`)
            .setColor(global.koda.color).setDescription(`
  **O ping da API é de:** \`${global.koda.ws.ping}ms\`
  **Uso de RAM:** \`${ramPercent}%\`
  **Quantidade de shards:** \`1 shard\`
  **Uptime:** \`${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos\`.
  `);

        message.reply({
            embeds: [embed]
        });
    },
};
