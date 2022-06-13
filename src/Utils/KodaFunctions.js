async function getUserBadges(user) {
    const badgeEmojis = {
        DISCORD_EMPLOYEE: "<:zu_staffdc:933096931197071380>",
        PARTNERED_SERVER_OWNER: "<:zu_partner:885196140042158170>",
        HYPESQUAD_EVENTS: "<:zu_hypesquad:885919442117222400>",
        BUGHUNTER_LEVEL_1: "<:zu_bughunter_1:885918998426951721>",
        HOUSE_BRAVERY: "<:zu_bravery:885918769422151750>",
        HOUSE_BRILLIANCE: "<:zu_brilliance:885918816654213191>",
        HOUSE_BALANCE: "<:zu_balance:885918786878836827>",
        EARLY_SUPPORTER: "<:zu_supporter:885919070476705792>",
        BUGHUNTER_LEVEL_2: "<:zu_bughunter_2:885919018349920306>",
        EARLY_VERIFIED_BOT_DEVELOPER: "<:zu_developer:885918499380293692>",
        DISCORD_CERTIFIED_MODERATOR: "<:zu_certifiedmod:885193463111483412>",
        VERIFIED_BOT:
            "<:zu_verifiedbot_1:885923881108504616><:zu_verifiedbot_2:885923960473153546>",
        BOT: "<:zu_bot:885923705316859955>",
        BOT_HTTP_INTERACTIONS: "<:zu_bot:885923705316859955>",
    };
    const userBadges = user.flags?.toArray() || "";
    let badgesArray = "";
    for (let i = 0; i < userBadges.length; i++) {
        badgesArray += badgeEmojis[userBadges[i]] + " ";
    }
    return badgesArray;
}

function uptime() {
    function pad(n, z) {
        z = z || 2;
        return ("00" + n).slice(-z);
    }
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    let hrs = (s - mins) / 60;

    let days = parseInt(Math.floor(hrs / 24));
    hrs = parseInt(hrs % 24);

    const months = parseInt(Math.floor(days / 30));
    days = parseInt(days % 30);

    return (
        (months > 0 ? `\`${pad(months)}\`` + " meses, " : "") +
        (days > 0 ? `\`${pad(days)}\`` + " dias, " : "") +
        (hrs > 0 ? `\`${pad(hrs)}\`` + " horas, " : "") +
        (mins > 0 ? `\`${pad(mins)}\`` + " minutos, " : "") +
        (`\`${pad(secs)}\`` + " segundos")
    );
};

async function abbNumber(abbreviation) {
	if (abbreviation.includes('+') || abbreviation.includes('-') || abbreviation.includes('*') || abbreviation.includes('/')) return 0;
	if (abbreviation.startsWith('0.') || abbreviation.startsWith('.')) return 0;
	const number = parseFloat(abbreviation.substr(0, abbreviation.length - 1));
	const unit = abbreviation.substr(-1);
	const zeros = {
		k: 1e3,
		m: 1e6,
		b: 1e9,
		t: 1e12,
		K: 1e3,
		M: 1e6,
		B: 1e9,
		T: 1e12
	};

	const value = !zeros[unit] ? parseFloat(abbreviation) : number * zeros[unit];
	return Number(String(value).replace('-', ' '));
};

global.koda.getUserBadges = getUserBadges;
global.koda.abbNumber = abbNumber;
global.koda.uptime = uptime;
