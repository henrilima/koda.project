const fileUtils = require("./../Utils/fileUtils");
const path = require('path');

module.exports = class {
    constructor(e) {
        if (!e) throw new Error("Insira o client.");
        this.client = e;
    }

    async start(token) {
        return await this.client.login(token), "kodaBot";
    }

    get exit() {
        return process.exit();
    }

    async loadEvents(dir) {
        for (const dirInfo of fileUtils.searchByExtension(dir, "js")) {
            for (const file of dirInfo.files) {
                let events = require(file);
                if (!Array.isArray(events)) {
                    events = [events];
                }

                for (const event of events) {
                    if (!event.name || !event.execute) {
                        continue;
                    }

                    global.koda.on(event.name, (...args) =>
                        event.execute(...args)
                    );
                }
            }
        }
    }

    async loadCommands(dir) {
        for (const dirInfo of fileUtils.searchByExtension(dir, "js")) {
            const dirList = dirInfo.directory.split("/");
            dirList.shift();

            for (const file of dirInfo.files) {
                let cmd = require(file);
                if (!cmd.help) {
                    continue;
                }

                global.koda.commands.set(cmd.name, cmd);
                if (cmd.aliases) {
                    cmd.aliases
                        .filter((alias) => alias.trim() !== "")
                        .forEach((alias) =>
                            global.koda.aliases.set(alias, cmd.name)
                        );
                }
            }
        }
    }
};
