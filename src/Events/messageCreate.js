const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel.type == "dm") return;

        const commandFolders = fs.readdirSync("./src/Commands");
        console.log(commandFolders);
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/Commands/${folder}`)
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                const command = require(`../../src/Commands/${folder}/${file}`);
                global.koda.commands.set(command.name, command);
            };
        };

        let prefix = '-';

        if (
            message.content.startsWith("<@" + global.koda.user.id + ">") ||
            message.content.startsWith("<@!" + global.koda.user.id + ">")
        ) {
            let embed = {
                color: global.koda.color,
                title: "Olá!",
                thumbnail: {
                    url: global.koda.user.avatarURL({
                        format: "png",
                    }),
                },
                description: `
**Meu nome é Delta e eu sou um bot Multifuncional para o Discord. Meu prefixo neste servidor é \`${prefix}\`.
Tente usar \`${prefix}help\` para obter ajuda.**`,
            };
            message.channel.send({
                embed: embed,
            });
        };

        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command =
            global.koda.commands.get(commandName) ||
            global.koda.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command) return;

        global.koda.commands.get(command.name).execute(message, args);
    },
};