import { config } from "seyfert";

export default config.bot({
    locations: {
        base: 'src',
        commands: 'commands',
        events: 'events'
    },
    token: process.env.TOKEN,
    intents: [
        'Guilds',
        'GuildMembers',
        'MessageContent',
        'GuildMessages'
    ]
})
