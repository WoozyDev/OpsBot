import { Command, CommandContext, Declare } from "seyfert";
import ClientBot from "../structures/ClientBot";
import CooldownSystem from "../systems/CooldownSystem";
import utils from "../utils";

const begs = [
    ['Naigel saw you begging and gave you **%0%** credits', [1, 27]],
    ['mrWawe went right past you and dropped you **%0%** credits.', [5, 15]],
    ['aias came up to you and gave you **%0%** credits because he felt sad for you.', [15, 25]],
    ['Tappi was live when he noticed you outside begging for credits, so he sent you **%0%** credits.', [20, 25]],
    ['woozy was on his way home when he noticed you on the street, so he was generous enough to give you **%0%** credits.', [100, 200]],
    ['Blue Ackerman saw you begging on the street, so he took you in to watch anime, but also gave you **%0%** credits.', [2, 10]],
    ['Vyper was busy at his job and noticed you through the window begging, so he gave you **%0%** credits.', [10, 20]],
    ['CajunX was planning his next video idea, noticed you begging outside and he was generous enough to give you **%0%** credits.', [20, 30]],
    ['aias having his time preoccupied with eSports (*definitely not on vacation*), he used a few seconds to give you **%0%** credits.', [7, 12]],
    ['nercly was playing Valorant and noticed you begging for credits at his door, so he gave you **%0%** credits.', [20, 25]]
];

@Declare({
    name: 'beg',
    description: 'Beg for credits.'
})
export default class BegCommand extends Command {
    async run(context: CommandContext) {
        await context.deferReply();

        let account = await ClientBot._users.findOne({ _id: context.author.id });
        if(!account) {
            await context.editOrReply({
                content: `You need to register to start using these commands! Use \`/register\` to get started.`
            });
            return;
        }

        if(!CooldownSystem.canUse('beg', account.cooldowns.beg)) {
            await context.editOrReply({
                content: `You cannot use this command right now! Come back in **${utils.transform_milliseconds_into_readable_format(
                    account.cooldowns.beg - Date.now(), true
                )}**.`
            });
            return;
        }

        account.cooldowns.beg = CooldownSystem.getNextTimeCanUse('beg');

        let beg = [...begs[Math.floor(Math.random() * ((begs.length-1) - 0 + 1) + 0)]];

        let minNum = beg[1][0] as number;
        let maxNum = beg[1][1] as number;

        let randomNum = Math.floor(Math.random() * ((maxNum-1) - minNum + 1) + minNum);

        account.balance.credits += randomNum;

        await ClientBot._users.updateOne({
            _id: context.author.id
        }, {
            $set: {
                "cooldowns.beg": account.cooldowns.beg,
                "balance.credits": account.balance.credits
            }
        });

        await context.editOrReply({
            content: (beg[0] as string).replace('%0%', randomNum.toString())
        });

    }
}
